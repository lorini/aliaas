#include <iostream>
#include "Device.h"
#include <pthread.h>
#include <stdlib.h>
#include <stdio.h>
#include <sstream>
#include "X10Actuator.h"
#include "ChaconActuator.h"
#include <stdlib.h>

using namespace std;

Device::Device(string address , int state  ,string moduleName ,string description ,int x ,int y,
               string filename, vector<Service *> * services ) {
    this->address = address;
    this->state = state ;
    this->moduleName = moduleName;
    this->description = description ;
    this->x = x ;
    this->y = y ;
    this->filename = filename; 
    this->services = services;
}

Json::Value Device::Serialize() {
    Json::Value device ;
    device["address"] = address;
    device["state"] = convertInt(state);
    device["moduleName"] = moduleName;
    device["description"] = description;
    device["x"] = convertInt(x);
    device["y"] = convertInt(y);
    device["filename"] = filename; 
    
    if(services != NULL){
      for(int i =0 ; i < services->size() ; i++) {
        device["services"][i] = services->at(i)->Serialize() ;
      }
    }
    
    return device ;
}

Device * Device::Deserialize(Json::Value device) {

    Device * ret = NULL ; 
    
    if(device["moduleName"] == "chaconled") {
        ret = new ChaconActuator( device["address"].asString() ,
                                  atoi(device["state"].asString().c_str()) ,
                                  device["moduleName"].asString(),
                                  device["description"].asString() ,
                                  atoi(device["x"].asString().c_str()) ,
                                  atoi(device["y"].asString().c_str()) ,
                                  device["filename"].asString()) ;
    } else if (device["moduleName"] == "x10lamp") {
        ret = new X10Actuator(   device["address"].asString() ,
                                 atoi(device["state"].asString().c_str()) ,
                                 device["moduleName"].asString(),
                                 device["description"].asString() ,
                                 atoi(device["x"].asString().c_str()) ,
                                 atoi(device["y"].asString().c_str()) ,
                                 device["filename"].asString()) ;
    }

    /*if(ret->getServices() == NULL)*/
    ret->setServices(new vector<Service *>()) ; 

    for ( Json::ValueIterator it = device["services"].begin(); it != device["services"].end(); ++it) {
        ret->addService(Service::Deserialize((*it)));
    }

    return ret ;    
}

Device::Device() {}

string Device::getAddress() {
    return this->address;
}

void Device::setAddress(string address) {
    this->address = address ;
}

string Device::getModuleName() {
    return this->moduleName;
}

void Device::setModuleName(string moduleName) {
    this->moduleName = moduleName ;
}

Device::~Device() {
    //cout << "Waiting for "<< this->moduleName <<"'s (@"<< this->address <<") thread to finish." << endl ;
    //pthread_join( this->deviceThread, NULL);
    //cout << this->moduleName <<"'s thread terminated." << endl ;
}

int Device::getState() {
    return this->state ;
}

void Device::setState(int state) {
    this->state = state ;
}

int Device::getX(){
    return x ;
}
int Device::getY(){
    return y ;
}

void Device::setFilename( string filename){
    this->filename = filename ;
}

string Device::getFilename(){
  return filename ; 
}

string Device::convertInt(int number)
{
    stringstream ss;
    ss << number;
    return ss.str();
}

vector<Service *> * Device::getServices(){
  return this->services ; 
}

void Device::setServices(vector<Service *> * services){
  this->services = services ; 
}

void Device::addService(Service * service){
  this->services->push_back(service); 
}







