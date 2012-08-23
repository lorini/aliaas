#ifndef DEVICE_H
    #define DEVICE_H

    #include <string.h>
    #include "json.h"   
    #include "Service.h"

    #define  ON_STATE 1
    #define OFF_STATE 0

    using namespace std;

    class Device {

        public:
            Device(string address , int state  ,string moduleName ,string description ,int x ,int y, 
               string filename, vector<Service *> * services = NULL);
            Device();
           ~Device() ;

            virtual void switchOn()  = 0;
            virtual void switchOff() = 0;
            Json::Value Serialize();
            static Device * Deserialize(Json::Value) ;
            static string convertInt(int);

            void addService(Service *);
           
            void setAddress(string) ;
            void setDeviceThread(pthread_t);
            void setState(int);
            void setModuleName(string); void setFilename(string) ;
            void setServices( vector<Service *> * services) ; 

            pthread_t getDeviceThread() ;
            string getAddress() ;
            string getFilename() ;
            int getX() ;
            int getY(); 
            int getState();
            string getModuleName();
            vector<Service *> * getServices(); 

            
        private:
            string address ;
            string moduleName ;
            string description ;
            int state  ;
            int x ;
            int y ;
            string filename ;
            vector<Service *> * services ; 

        public :
            pthread_t deviceThread;

    };
#endif
