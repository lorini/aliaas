#ifndef ACTUATOR_H
#define ACTUATOR_H

#include "Actuator.h"
#include "Device.h"
#include "json.h"
#include "Service.h"

using namespace std;

class Actuator : public Device
{

public:
    /* Constructor */
    Actuator() ;
    Actuator(string, int, string, string, int, int, string, vector<Service *> *);

    /* Public Methods */
    virtual void switchOn()  = 0;
    virtual void switchOff() = 0;

    bool getIsDimable() ;
    int  getDimLevel();

    void setIsDimable(bool);
    void setDimLevel(int);

private:
    bool isDimable ;
    int dimLevel ;

};


#endif
