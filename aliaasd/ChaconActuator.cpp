#include <iostream>
#include "ChaconActuator.h"
#include "Actuator.h"
#include "Device.h"
#include <string>
#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>

#define CHACON_CMD          "tdtool"
#define CHACON_ON           "--on"
#define CHACON_OFF          "--off"
#define CHACON_DIM_LEVEL    "--dimlevel"

#define color(param) printf("\033[%sm",param)

using namespace std;

ChaconActuator::ChaconActuator() {}

ChaconActuator ::ChaconActuator(string address ,int state  ,string moduleName ,string description ,int x ,int y ,string filename, vector<Service *> * services)
    :Actuator(address,state,moduleName,description,x,y,filename, services) {}

void ChaconActuator::switchOn() {
    pthread_create(&this->deviceThread , NULL, &ChaconActuator::switchOn_t, this);
}

void ChaconActuator::switchOff() {
    pthread_create(&this->deviceThread , NULL, &ChaconActuator::switchOff_t, this);
}

void * ChaconActuator::switchOn_t(void *data) {
    ChaconActuator * myChaconActuator = (ChaconActuator *)data;
    myChaconActuator->setState(1);
    char commande[64];
    char debug[64];
    sprintf(debug, "[Info][ChaconActuator::switchOn_t][%s]", myChaconActuator->getAddress().c_str());
    cout << debug << endl ;
    sprintf(commande, "%s %s %s >> /dev/null", CHACON_CMD, CHACON_ON, myChaconActuator->getAddress().c_str() );
    system(commande);
    return NULL;
}

void * ChaconActuator::switchOff_t(void * data) {
    ChaconActuator * myChaconActuator = (ChaconActuator *)data;
    myChaconActuator->setState(0) ;
    char commande[64];
    char debug[64];
    sprintf(debug, "[Info][ChaconActuator::switchOff_t][%s]", myChaconActuator->getAddress().c_str());
    cout << debug << endl ;
    sprintf(commande, "%s %s %s >> /dev/null", CHACON_CMD, CHACON_OFF, myChaconActuator->getAddress().c_str() );
    system(commande);
    return NULL;
}