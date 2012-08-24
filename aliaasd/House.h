#ifndef HOUSE_H
#define HOUSE_H

#include "Room.h"
#include <vector>
#include "json.h"

using namespace std;

class House
{

public:
    /* Constructor */
    House(string name);

    /* Public Methods */
    void addRoom(Room*);
    vector<Room *>  getRooms();
    void setRooms(Room*);

    Json::Value Serialize();
    static House * Deserialize(Json::Value);
    /* Destructor */
    ~House();

private:
    vector<Room *>  rooms ;
    string name ;

};

#endif
