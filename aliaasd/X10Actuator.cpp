#include <iostream>
#include "X10Actuator.h"
#include "Actuator.h"
#include "Device.h"
#include <string>
#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>

#define X10_CMD          "heyu"
#define X10_ON           "on"
#define X10_OFF          "off"
#define X10_DIM_LEVEL    "dimlevel"

#define color(param) printf("\033[%sm",param)

using namespace std;

X10Actuator::X10Actuator() {}

X10Actuator ::X10Actuator(string address ,int state  ,string moduleName ,string description ,int x ,int y , string filename,vector<Service *> * services)
:Actuator(address,state,moduleName,description,x,y,filename, services) {}

void X10Actuator::switchOn() {
    pthread_create(&this->deviceThread , NULL, &X10Actuator::switchOn_t, this);
}

void X10Actuator::switchOff() {
    pthread_create(&this->deviceThread , NULL, &X10Actuator::switchOff_t, this);
}

void * X10Actuator::switchOn_t(void *data) {
    X10Actuator * myX10Actuator = (X10Actuator *)data;
    myX10Actuator->setState(1);
    char commande[64];
    char debug[64];
    sprintf(debug, "[Info][X10Actuator::switchOn_t][%s]", myX10Actuator->getAddress().c_str());
    cout << debug << endl ;
    sprintf(commande, "%s %s %s >> /dev/null", X10_CMD, X10_ON, myX10Actuator->getAddress().c_str() );
    system(commande);
    return NULL;
}

void * X10Actuator::switchOff_t(void * data) {
    X10Actuator * myX10Actuator = (X10Actuator *)data;
    myX10Actuator->setState(0) ;
    char commande[64];
    char debug[64];
    sprintf(debug, "[Info][X10Actuator::switchOff_t][%s]", myX10Actuator->getAddress().c_str());
    cout << debug << endl ;
    sprintf(commande, "%s %s %s >> /dev/null", X10_CMD, X10_OFF, myX10Actuator->getAddress().c_str() );
    system(commande);
    return NULL;
}