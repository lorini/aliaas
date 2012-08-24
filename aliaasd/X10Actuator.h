#ifndef X10ACTUATOR_H
#define X10ACTUATOR_H

#include "Actuator.h"
#include "json.h"
#include "Service.h"
using namespace std;

class X10Actuator : public Actuator
{
    
public:
    /* Constructor */
    X10Actuator(string, int, string, string, int, int,string,vector<Service *> * = NULL );
    X10Actuator();
    
    //~X10Actuator();
    
    /* Public methods */
    void switchOn();
    void switchOff();
    
    static void * switchOn_t(void *);
    static void * switchOff_t(void *);
};


#endif
