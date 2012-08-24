#ifndef SERVICE_H
	
	#define SERVICE_H

    #define SERVICE_TYPE_IMAGE  0x1 
    #define SERVICE_TYPE_CIRCLE 0x2 

    #include <vector>
    #include <cstring>
    #include "Point.h"
	#include "Need.h"
    #include <opencv/cv.h>
    #include <opencv/cvaux.h>
    #include <opencv/highgui.h>
    #include "json.h"   
    
	using namespace std;

	class Need; 

	class Service{

		public:
		    Service(IplImage* image, Point * point =  NULL, int radius = 0, double ratio = 1); 
		    Service(string url, Point * point = NULL, int radius = 0, double ratio = 1);

       		Service operator+(const Service& service) ;
        	bool    operator<(const Need& need) ;
        	bool    operator>(const Need& need) ;

        	void setType(int type); 
        	void setPoint(Point * point); 
        	void setRadius(int radius);
        	void setUrl(string url) ;
        	void setImage(IplImage * image);

        	int        getType(); 
            int        getRadius();
        	Point *    getPoint();
        	string     getUrl(); 
        	IplImage * getImage(); 

            Json::Value Serialize() ;
            static Service * Deserialize(Json::Value);

            static string convertInt(int);

		private:
			int type ; 
            int radius ; 
			Point * point ;
			string url ; 
			IplImage * image ;
	};

#endif
