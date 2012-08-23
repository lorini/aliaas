#include <iostream>
#include <fstream>
#include <cstdlib>
#include <cstring>
#include <queue>

#include <signal.h>
#include <arpa/inet.h>
#include <netdb.h>
#include <netinet/in.h>
#include <unistd.h>
#include <stdlib.h>
#include <stdio.h>
#include <errno.h>
#include <pthread.h>

#include "House.h"
#include "Room.h"
#include "ChaconActuator.h"
#include "X10Actuator.h"
#include "Device.h"
#include "json.h"
#include "main.h"
#include "base64.h"
#include "Point.h"
#include "Need.h"
#include "Service.h"
#include "Algorithm.h"

#include <opencv/cv.h>
#include <opencv/cvaux.h>
#include <opencv/highgui.h>

#define MAX_MSG         65533
#define MSG_ARRAY_SIZE  (MAX_MSG+3)
#define color(param) printf("\033[%sm",param)

using namespace std ;

House * house ;
queue<Json::Value> * qCommand = new queue<Json::Value >() ;

static pthread_mutex_t lock_house;
static pthread_mutex_t lock_qCommand;

int main () {

    cout << "[Aliaas] Initialization !"<< endl ; 
    cout << "[Aliaas] Starting node.js daemon !"<< endl ; 


    // SAUVEGARDER LE HOUSE.JSON PUIS LE CHARGER. (CE A CHAQUE SAUVEGARDE ??) //

    /* DESERIALIZATION */
    pthread_mutex_lock(&lock_house);
    house = load() ;
    pthread_mutex_unlock(&lock_house);

    /* SIGNAL HANDLERS */
    signal(SIGHUP , signal_handler);
    signal(SIGTERM, signal_handler);
    signal(SIGINT , signal_handler);
    signal(SIGQUIT, signal_handler);
    signal(SIGKILL, signal_handler);
    signal(SIGPIPE, signal_handler);
    signal(SIGINT , signal_handler);
    signal(SIGCHLD, signal_handler);

    /* THREAD */
    pthread_t threadCommandExecutor;
    pthread_t threadNodeJs;
   // pthread_t threadStateObservator;
    pthread_t threadCommandReceiver;
    pthread_create(&threadCommandExecutor , NULL, &commandExecutor, NULL);
    pthread_create(&threadNodeJs , NULL, &nodeJs, NULL);
   // pthread_create(&threadStateObservator , NULL, &stateObservator, NULL);
    pthread_create(&threadCommandReceiver , NULL, &commandReceiver, NULL);

    /* Initialization Algorithm */
    Algorithm::init(house->getRooms().at(0)); 

    cout << "[Aliaas] Ready to light !"<< endl ; 
    for(;;) sleep(1000) ;

    return 0;
}
    
void exec_command(Json::Value root) {

    const Json::Value action        = root["action"]    ;
    const Json::Value device        = root["device"]    ;
    const Json::Value room          = root["room"]      ;
    const Json::Value heatmap       = root["heatmap"]   ;
    const Json::Value image         = root["image"]     ;

    Device * myDevice = NULL ;
    Room   * myRoom   = NULL ;

    if(action == "on" || action == "off") {
        myDevice = findDeviceWithAddress(device["address"].asString());
        if(myDevice == NULL ) {
            cout << "[Error][exec_command][DeviceNotFound] : " << device["address"] << endl ;
            return ;
        } 
    }
    if(action == "deleteall" || action == "add" || action == "algov0") {
        myRoom = findRoomWithName(room["name"].asString()) ;
        if(myRoom == NULL ) {
            cout << "[Error][exec_command][RoomNotFound] : " << room["name"] << endl ;
            return ;
        }
    }
    
    pthread_mutex_lock(&lock_house);

    if(action == "algov0") {
        vector<Point *> * points = new vector<Point *>() ; 
        vector<Need *> * needs ; 
        for ( int j = 0; j < heatmap.size(); j++ ){  
            Json::Value point = heatmap[j];
            Point * myPoint = new Point(atoi(point["x"].asString().c_str()),atoi(point["y"].asString().c_str())) ; 
            points->push_back(myPoint) ;
        }   

        string url = "temp_heatmap.png" ;
        needs = new vector<Need*>() ;
        ofstream fichier(url.c_str(), ios::out | ios::trunc);
        if(fichier) {
            fichier << base64_decode(image.asString()) ;
            fichier.close();
        } else {
            cout << "[Error][exec_command][Fail to create file] " << endl ; 
        }

        Need * need1 = new Need(url, NEED_CONSTRAINT_MIN, 1, points) ; 
        //Need * need2 = new Need(url, NEED_CONSTRAINT_MAX, 0, points) ; 

        needs->push_back(need1);
        //needs->push_back(need2);
        Algorithm::version1(myRoom, needs) ;
        save(house);

    } else if(action == "add"){
        myDevice = Device::Deserialize(device);
        save_image(device["filename"].asString().c_str(), image.asString());
        myDevice->getServices()->push_back(new Service(device["filename"].asString(), new Point(device["x"].asString(),device["y"].asString()), atoi(device["maxrange"].asString().c_str())));
        myDevice->getServices()->push_back(new Service(device["filename"].asString(), new Point(device["x"].asString(),device["y"].asString()), atoi(device["maxrange"].asString().c_str()),0.80));
        myDevice->getServices()->push_back(new Service(device["filename"].asString(), new Point(device["x"].asString(),device["y"].asString()), atoi(device["maxrange"].asString().c_str()),0.60));
        myDevice->getServices()->push_back(new Service(device["filename"].asString(), new Point(device["x"].asString(),device["y"].asString()), atoi(device["maxrange"].asString().c_str()),0.40));
        myDevice->getServices()->push_back(new Service(device["filename"].asString(), new Point(device["x"].asString(),device["y"].asString()), atoi(device["maxrange"].asString().c_str()),0.20));
        myRoom->addDevice(myDevice);
    } else if(action == "exportcanvas") {
        ofstream fichier("heatmap.png", ios::out | ios::trunc);
        if(fichier) {
            fichier << base64_decode(image.asString()) ;
            fichier.close();
        }
    } 
    else if(action == "on") {
        myDevice->switchOn();
    } else if(action == "off") {
        myDevice->switchOff();
    } else if(action == "delete") {
        delete myDevice ;
    } else {
        cout << "[Error][exec_command][CommandNotFound] : " << action << endl ;
    }
    save(house); 
    pthread_mutex_unlock(&lock_house);
}

void signal_handler(int sig) {
    if(sig == SIGINT) {
        cout << "\b\bExiting ..." << endl ;
        pthread_mutex_lock(&lock_house);
        save(house);
        exit(0);
    }
}

void * commandExecutor(void * data) {
    for(;;) {
        pthread_mutex_lock(&lock_qCommand);
        if(!qCommand->empty()) {
            cout << "[Info][commandExecutor][qCommand->pop()]" << endl ;
            exec_command(qCommand->front());
            qCommand->pop() ;
        }
        pthread_mutex_unlock(&lock_qCommand);
        usleep(750) ;
    }
}

void * nodeJs(void * data) {
    system("node ../node.server.js ./house.json");
}

void * stateObservator(void * data) {
    int sockfd, newsockfd, yes = 1 ;
    socklen_t clilen;
    struct sockaddr_in serv_addr, cli_addr;

    if ((sockfd = socket(AF_INET, SOCK_STREAM, 0)) < 0) {
        perror("[Error][stateObservator][socket()] ");
        return NULL ;
    }

    bzero((char *) &serv_addr, sizeof(serv_addr));
    serv_addr.sin_family = AF_INET;
    serv_addr.sin_addr.s_addr = INADDR_ANY;
    serv_addr.sin_port = htons(2001);
    setsockopt(sockfd, SOL_SOCKET, SO_REUSEADDR, &yes, sizeof(int));

    if (bind(sockfd, (struct sockaddr *) &serv_addr,sizeof(serv_addr)) < 0) {
        perror("[Error][stateObservator][bind()] ");
        close(sockfd);
        exit(1);
    }

    listen(sockfd,20);
    clilen = sizeof(cli_addr);

    while(1) {
        newsockfd = accept(sockfd, (struct sockaddr *) &cli_addr,  &clilen);
        pthread_t threadsendChangeState;
        pthread_create(&threadsendChangeState , NULL, &sendChangeState, &newsockfd);
    }

    close(sockfd);
    return NULL;
}

void * sendChangeState(void * arg) {
    Json::Value remoteRoot, localRoot;
    Json::Reader reader;
    time_t start,end;

    int*  data = reinterpret_cast<int*>(arg);
    int   newsockfd = *data;
    char buffer[MAX_MSG];

    if (newsockfd < 0) {
        perror("[Error][sendChangeState][accept()] ");
        return NULL ;
    }

    if ((read(newsockfd,buffer,MAX_MSG)) < 0) {
        perror("[Error][sendChangeState][read()] ");
        close(newsockfd);
        return NULL ;
    }

    if ( !reader.parse(buffer, remoteRoot, false) ) {
        cout << "[Error][sendChangeState][reader.parse()] " << endl ;
        cout << "[Text : "<< buffer << "]" << endl << reader.getFormatedErrorMessages()<< endl;
        close(newsockfd);
        return NULL ;
    }
    
    time (&start);
    do {
        pthread_mutex_lock(&lock_house);
        localRoot = house->Serialize();
        pthread_mutex_unlock(&lock_house);
        usleep(750) ;
        time (&end);
        if(difftime(end,start) > 30) {
            cout << "[Info][sendChangeState][TimeOut] " << endl ;
            return NULL;
        }
    } while(localRoot.toStyledString() == remoteRoot.toStyledString()) ;
    
    cout << "[Info][sendChangeState][localRoot != remoteRoot] " << endl ;

    if ((write(newsockfd,localRoot.toStyledString().c_str(),strlen(localRoot.toStyledString().c_str()))) < 0) {
        perror("[Error][sendChangeState][write()] ");
        close(newsockfd);
        return NULL ;
    }

    close(newsockfd);
    return NULL ;
}

void * commandReceiver(void * data) {
    Json::Value root;
    Json::Reader reader;
    int listenSocket, newsockfd, yes = 1 ;
    socklen_t clientAddressLength;
    struct sockaddr_in clientAddress, serverAddress;
    char msg[MSG_ARRAY_SIZE];

    if ((listenSocket = socket(AF_INET, SOCK_STREAM, 0)) < 0) {
        perror("[Error][commandReceiver][socket()] ");
        exit(1);
    }
    
    serverAddress.sin_family = AF_INET;
    serverAddress.sin_addr.s_addr = htonl(INADDR_ANY);
    serverAddress.sin_port = htons(2000);
    setsockopt(listenSocket, SOL_SOCKET, SO_REUSEADDR, &yes, sizeof(int));

    if (bind(listenSocket,(struct sockaddr *) &serverAddress, sizeof(serverAddress)) < 0) {
        perror("[Error][commandReceiver][bind()] ");
        close(listenSocket);
        exit(1);
    }

    listen(listenSocket, 5);

    while (1) {        
        clientAddressLength = sizeof(clientAddress);
        newsockfd = accept(listenSocket, (struct sockaddr *) &clientAddress,  &clientAddressLength);

        if (newsockfd < 0) {
            perror("[Error][commandReceiver][accept()] ");
            return NULL ;
        }
        
        memset(msg, 0x0, MSG_ARRAY_SIZE);
        string buff;
        while ((read(newsockfd,msg,MSG_ARRAY_SIZE)) > 0) {
            buff += msg ;
            memset(msg, 0x0, MSG_ARRAY_SIZE);
        }
        
        if (strlen(buff.c_str()) > 0) {
            if ( !reader.parse(buff, root, false) ) {
                cout << "[Error][commandReceiver][reader.parse()] " << endl ;
                cout << "[Text : "<< buff << "]" << endl << reader.getFormatedErrorMessages()<< endl;
                continue ;
            }
            pthread_mutex_lock(&lock_qCommand);
            qCommand->push(root);
            pthread_mutex_unlock(&lock_qCommand);
        }
    }
}

Room * findRoomWithName(string name) {
    pthread_mutex_lock(&lock_house);
    for (int i=0; i< house->getRooms().size() ; i++) {
        if(house->getRooms().at(i)->getName() == name) {
            pthread_mutex_unlock(&lock_house);
            return house->getRooms().at(i) ;
        }
    }
    pthread_mutex_unlock(&lock_house);
    return NULL;
}

Device * findDeviceWithAddress(string address) {
    pthread_mutex_lock(&lock_house);
    for (int i=0; i< house->getRooms().size() ; i++) {
        Room * myRoom = house->getRooms().at(i) ;
        for(int j = 0 ; j < myRoom->getDevices().size() ; j++ ) {
            if(myRoom->getDevices().at(j)->getAddress() == address ) {
                pthread_mutex_unlock(&lock_house);
                return myRoom->getDevices().at(j);
            }
        }
    }
    pthread_mutex_unlock(&lock_house);
    return NULL;
}

House * load() {
    Json::Value root;
    Json::Reader reader;
    string msg , ligne;
    ifstream fichier("house.json", ios::in);

    if(fichier)while(getline(fichier, ligne)) msg += ligne;
    else return NULL ;

    if ( !reader.parse(msg, root, false) ) {
        cout << "[Error][load][reader.parse()] " << endl ;
        cout << "[Text : "<< msg << "]" << endl << reader.getFormatedErrorMessages()<< endl;
        exit(0);
    }
    return House::Deserialize(root);
}

void save(House * house) {
    ofstream fichier("house.json", ios::out | ios::trunc);
    if(fichier) {
        fichier << house->Serialize().toStyledString() ;
        fichier.close();
    }

}

void hash(char *s, const int len) {
    static const char alphanum[] =
        "0123456789"
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        "abcdefghijklmnopqrstuvwxyz";

    for (int i = 0; i < len; ++i) {
        s[i] = alphanum[rand() % (sizeof(alphanum) - 1)];
    }

    s[len] = 0;
}

void save_image(const char * url, string image){
    ofstream fichier(url, ios::out | ios::trunc);
    if(fichier) {
        fichier << base64_decode(image) ;
        fichier.close();
    } else cout << "erreur fichier" ;
}
