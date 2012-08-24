#ifndef NEED_H

#define NEED_H

#define NEED_TYPE_IMAGE 0x1 
#define NEED_TYPE_POINT 0x2 

#define NEED_CONSTRAINT_MIN 1 
#define NEED_CONSTRAINT_MAX 2

#include <vector>
#include <cstring>
#include <iostream>
#include <stdlib.h>
#include "Point.h"
#include "Service.h"
#include <opencv/cv.h>
#include <opencv/cvaux.h>
#include <opencv/highgui.h>

using namespace std;

class Service ;

class Need { 

    public:
        Need(string url      , int constraint, int weight =0 , vector<Point*> * points = NULL );
        Need(IplImage*  image, int constraint, int weight =0 , vector<Point*> * points = NULL );

        Need operator-(Service& service) ;
        bool operator<(Service& service) ;
        bool operator>(Service& service) ;
        bool operator>(Need& need) ;
        bool operator<(Need& need) ;
        
        vector<Point*> * getPoints() ;
        string getUrl(); 
        IplImage * getImage();  
        int getType(); 
        int getConstraint(); 
        int getWeight() ;

        void setPoints(vector<Point*> * points);
        void setUrl(string url) ; 
        void setImage(IplImage * image) ; 
        void setType(int type);
        void setConstraint(int constraint) ; 
        void setWeight(int weight) ; 

    private:
        vector<Point*> * points ;
        string url ; 
        IplImage * image; 
        int type ; 
        int constraint ; 
        int weight ;
        
};

#endif