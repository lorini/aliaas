#include <iostream>
#include <stdlib.h>
#include "Service.h"
#include <sstream>

using namespace std;

Service::Service(IplImage* image, Point * point, int radius, double ratio){
    this->image = image ; 
    this->point = point ; 
    this->radius = radius ;
   
    if(radius == 0) 
        this->type = SERVICE_TYPE_IMAGE ; 
    else 
        this->type = SERVICE_TYPE_CIRCLE ; 

}

Service::Service(string url, Point * point, int radius, double ratio){
    this->point = point ; 
    this->radius = radius ; 
    if(ratio >=1) {
        this->image = cvLoadImage(url.c_str(), 0);
        this->url = url ; 
    } else {

        IplImage * tmp  = cvLoadImage(url.c_str(), 0);
        if(!tmp) cout << "Erreur tmp" << endl ; 

        IplImage * tmp2 = cvCreateImage(cvSize(tmp->width*ratio,tmp->height*ratio),tmp->depth,tmp->nChannels);
        if(!tmp2) cout << "Erreur tmp2" << endl ; 

        this->image  = cvCreateImage(cvSize(tmp->width,tmp->height),tmp->depth,tmp->nChannels);
        if(!this->image ) cout << "Erreur this->image" << endl ; 

        cvResize(tmp, tmp2) ;
        if(!tmp2) cout << "Erreur tmp2 resize" << endl ; 

      //  cout << "Total = " << point->getX() << "-" << tmp2->width/2 <<" = " << point->getX() - tmp2->width/2 << endl ;
       // cout << "Total = " << point->getY() << "-" << tmp2->height/2 << " = " << point->getY() - tmp2->height/2 << endl ;

  //      int x = point->getX()-(tmp2->width/2) < 0 ? 0 : point->getX()-(tmp2->width/2) > tmp->width ? tmp->width :  point->getX()-(tmp2->width/2) ;
//        int y = point->getY()-(tmp2->height/2) < 0 ? 0 : point->getY()-(tmp2->height/2) > tmp->height ? tmp->height :  point->getY()-(tmp2->height/2) ;



        CvRect selection = cvRect( point->getX() - ratio*point->getX() , point->getY() - ratio*point->getY(), tmp2->width, tmp2->height);
        cvSetImageROI( this->image , selection );
        cvCopy(tmp2, this->image );
        cvResetImageROI( this->image  );

    // créer un flux de sortie
        std::ostringstream oss;
        // écrire un nombre dans le flux
        oss << ratio*100;
        // récupérer une chaîne de caractères
        this->url = url+"."+oss.str()+".png" ;
        cout << this->url << endl ; 
        cvSaveImage(this->url.c_str(),this->image ) ;
    }
    
    if(!this->image)cout << "[Error][Need][Constructor] Could not load image file : " << url << endl ;    
   
    if(radius == 0) 
        this->type = SERVICE_TYPE_IMAGE ; 
    else 
        this->type = SERVICE_TYPE_CIRCLE ; 
}

Service Service::operator+(const Service& service){

}

bool Service::operator<(const Need& need){
        return true ;
}

bool Service::operator>(const Need& need){
        return true ;
}

void Service::setType(int type){
        this->type = type ; 
}

void Service::setPoint(Point * point){
        this->point = point ; 
} 

void Service::setRadius(int radius){
        this->radius = radius ;
}

void Service::setUrl(string url){
        this->url = url ; 
}

void Service::setImage(IplImage * image){
        this->image = image ; 
}

int Service::getType(){
        return type ; 
}       

Point * Service::getPoint(){
        return point ; 
}

int Service::getRadius(){
        return radius ; 
}

string Service::getUrl(){
        return url; 
}

IplImage * Service::getImage(){
        return image ; 
}


Json::Value Service::Serialize(){
    Json::Value service ;
    service["type"] = convertInt(type);
    service["url"] = url;
    service["radius"] = convertInt(radius);
    service["point"] = point->Serialize();
    return service ;
}

Service *   Service::Deserialize(Json::Value service){
    Service * myService = new Service( service["url"].asString() , Point::Deserialize(service["point"]), atoi(service["radius"].asString().c_str())  ) ;
    return myService ;
}

string Service::convertInt(int number)
{
    stringstream ss;
    ss << number;
    return ss.str();
}

