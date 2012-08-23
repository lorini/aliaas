#include "Need.h"

using namespace std;

Need::Need(string url , int constraint, int weight , vector<Point*> * points){
	if( points == NULL ) {
		this->type = NEED_TYPE_IMAGE ;
	} else {
		this->type 		= NEED_TYPE_POINT ;
		this->points 	= points ; 
	}
	this->url = url ; 
	this->weight = weight ;
	this->constraint = constraint; 
	this->image = cvLoadImage(url.c_str(), 0);
	if(!this->image)cout << "[Error][Need][Constructor] Could not load image file : " << url << endl ;
   
}

Need::Need(IplImage * image , int constraint , int weight, vector<Point*> * points){
	if( points == NULL ) {
		this->type = NEED_TYPE_IMAGE ;
	} else {
		this->type 		= NEED_TYPE_POINT ;
		this->points 	= points ; 
	}
	this->url = url ;
	this->weight = weight ; 
	this->constraint = constraint; 
	this->image = image ; 
}

Need Need::operator-(Service& service) {

}

bool Need::operator<(Service& service) {

}

bool Need::operator>(Service& service) {

}

bool Need::operator>(Need& need) {
	if(this->weight > need.getWeight()) return true ; 
	else return false ; 
}

bool Need::operator<(Need& need) {
	if(this->weight < need.getWeight()) return true ; 
	else return false ; 
}

vector<Point *> * Need::getPoints(){
	return this->points ;
}

string Need::getUrl(){
	return this->url ; 
}

IplImage * Need::getImage(){
	return this->image; 
}

int Need::getType(){
	return this->type ; 
}

int Need::getConstraint(){
	return this->constraint ;
}

int Need::getWeight(){
	return this->weight ;
}

void Need::setType(int type){
	this->type = type ; 
}

void Need::setPoints(vector<Point*> * points){
	this->points = points ; 
}

void Need::setUrl(string url){
	this->url = url ; 
}

void Need::setImage(IplImage * image){
	this->image = image ; 
}

void Need::setConstraint(int constraint){
	this->constraint = constraint ;
}

void Need::setWeight(int weight){
	this->weight = weight ; 
}

