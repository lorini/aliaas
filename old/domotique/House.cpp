#include <iostream>

#include "House.h"
#include "Room.h"
#include "vector"
#include "json.h"

using namespace std;

House::House(string name) {
    this->name = name ;
}

House::~House() {
    for (int i=0; i<this->rooms.size() ; i++) {
        cout << "Room " << rooms.at(i)->getName() << "will be deleted." << endl ;
        delete rooms.at(i);
    }
    cout << "House deleted." << endl ;
}

void House::addRoom(Room * room) {
    this->rooms.push_back(room);
}

vector<Room *> House::getRooms() {
    return this->rooms;
}

Json::Value House::Serialize() {
    Json::Value house;
    house["name"] = name ;
    for(int i =0 ; i < rooms.size() ; i++) {
        house["rooms"][rooms.at(i)->getName()] = rooms.at(i)->Serialize() ;
    }
    return house ;
}

House * House::Deserialize(Json::Value house) {
    House * ret = new House(house["name"].asString());

    for ( Json::ValueIterator it = house["rooms"].begin(); it != house["rooms"].end(); ++it) {
        ret->addRoom(Room::Deserialize((*it)));
    }

    return ret ;
}






