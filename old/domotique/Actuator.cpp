#include <iostream>
#include "Actuator.h"

using namespace std;

Actuator::Actuator(string address ,int state  ,string moduleName ,
                   string description ,int x ,int y ,string filename, vector<Service *> * services)
    :Device(address,state,moduleName,description,x,y,filename, services) {


}

Actuator::Actuator() {}