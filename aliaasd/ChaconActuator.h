#ifndef CHACONACTUATOR_H
#define CHACONACTUATOR_H

#include "Actuator.h"
#include "json.h"
#include "Service.h"

using namespace std;

class ChaconActuator : public Actuator
{

public:
    /* Constructor */
    ChaconActuator(string, int, string, string, int, int,string,vector<Service *> * = NULL);
    ChaconActuator();

    //~ChaconActuator();

    /* Public methods */
    void switchOn();
    void switchOff();

    static void * switchOn_t(void *);
    static void * switchOff_t(void *);
    
};


#endif
