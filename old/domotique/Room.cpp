#include <iostream>
#include "Room.h"
#include "ChaconActuator.h"
#include "X10Actuator.h"
#include <vector>
#include <sstream>
#include <stdlib.h>
#include <math.h>
#include <algorithm>


Room::Room(string name, int width, int height) {
    this->name = name ;
    this->width = width ;
    this->height = height ;
}

Json::Value Room::Serialize() {
    Json::Value room ;
    room["name"] = name ;
    room["width"]= Device::convertInt(width);
    room["height"] = Device::convertInt(height) ;

    for(int i =0 ; i < devices.size() ; i++) {
        room["devices"][devices.at(i)->getAddress()] = devices.at(i)->Serialize() ;
    }
    return room ;
}

Room * Room::Deserialize(Json::Value room) {
    Room * ret = new Room(room["name"].asString(),atoi(room["width"].asString().c_str()),atoi(room["height"].asString().c_str()));

    for ( Json::ValueIterator it = room["devices"].begin(); it != room["devices"].end(); ++it) {
        ret->addDevice(Device::Deserialize((*it)));
    }
    return ret ;
}

Room::~Room() {
    for (int i=0; i<this->devices.size() ; i++) {
        //this->devices.at(i)->switchOff() ;
        delete this->devices.at(i) ;
    }
}

string Room::getName() {
    return this->name;
}

int Room::getWidth() {
    return this->width;
}

int Room::getHeight() {
    return this->height;
}

vector<Device *> Room::getDevices() {
    return this->devices ;
}

void Room::setDevices(vector<Device *> devices) {
    this->devices = devices ;
}

void Room::addDevice(Device * device) {
    this->devices.push_back(device);
}