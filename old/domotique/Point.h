#ifndef POINT_H
    
    #define POINT_H
    #include "json.h" 
    #include <cstring>
    #include <sstream>

    using namespace std;

    class Point {

        public:
            Point();
            Point(int x, int y);  
            Point(string x, string y);  
            void setX(int); 
            void setY(int);
            int getX();
            int getY();

            Json::Value Serialize() ;
            static Point * Deserialize(Json::Value);    
            string convertInt(int) ;

        private:
            int x ;
            int y ; 
    };

#endif