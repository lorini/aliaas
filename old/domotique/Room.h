#ifndef ROOM_H
#define ROOM_H

#include "Device.h"
#include <vector>
#include "json.h"

using namespace std;

class Room {
    
public:
    Room(string name, int width, int height);
    ~Room();

    void addDevice(Device *);
    Json::Value Serialize() ;
    static Room * Deserialize(Json::Value) ;

    string getName();
    int getWidth();
    int getHeight();
    vector<Device*>  getDevices();
    void setName(string);
    void setWidth(int);
    void setHeight(int);
    void setDevices(vector<Device *>);
    void algoV0(Json::Value); 

private:
    string name;
    int width  ;
    int height ;
    vector<Device *> devices ;

};

#endif
