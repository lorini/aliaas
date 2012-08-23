#include <iostream>
#include <stdlib.h>
#include "Point.h"

using namespace std;

Point::Point(int x=0, int y=0) {
    this->x = x ; 
    this->y = y ; 
}

Point::Point(string x, string y) {
    this->x = atoi(x.c_str()) ; 
    this->y = atoi(y.c_str()) ; 
}

void Point::setX(int x){
    this->x = x ; 
}

void Point::setY(int y){
    this->y = y ; 
}

int Point::getX(){
    return this->x ; 
}

int Point::getY(){
    return this->y ; 
}

Json::Value Point::Serialize(){
	Json::Value point ; 
	point["x"] = convertInt(x);
	point["y"] = convertInt(y);
	return point ; 
}

Point * Point::Deserialize(Json::Value value){
	Point * point = new Point(    atoi(value["x"].asString().c_str()), 
                                  atoi(value["y"].asString().c_str())) ;
	return point ; 
}

string Point::convertInt(int number)
{
    stringstream ss;
    ss << number;
    return ss.str();
} 