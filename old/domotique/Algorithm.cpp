#include "Algorithm.h" 
#include "Need.h"
#include "Room.h"


int Algorithm::init(Room * room){

}

int Algorithm::_init(vector<Device *> * devices){

}

int Algorithm::version1(Room * room , vector<Need *> * needs){
	
	int xa, ya, xb, yb,distance ;

    system("rm -rf need_debug_img/ && mkdir need_debug_img") ;	
	
    sort(needs->begin(), needs->end()) ; 

    for(int k=0 ; k < needs->size() ; k++ ){
        vector<Device *> * toBeSwitched = new vector<Device *>() ;
        Need * need = needs->at(k); 
    	
    	for(int i=0; i< room->getDevices().size() ; i++){   
    	    Device * myDevice = room->getDevices().at(i); 
            
		  /* TODO : LE FAIRE POUR CHAQUE SERVICE */
            if( need->getType() == NEED_TYPE_POINT  &&  myDevice->getServices()->at(0)->getType() == SERVICE_TYPE_CIRCLE ) {
                vector<Point *> * points = need->getPoints();
    			for (int j = 0; j < points->size() ; j++){
    			
                	Point * point = points->at(j);
    				xa = point->getX();
        	        ya = point->getY(); 
        	   	    xb = myDevice->getX(); 
    	       	    yb = myDevice->getY();	

                	distance = (int)sqrt((xb-xa)*(xb-xa) + (yb-ya)*(yb-ya)) ;
    				
    				if(distance <= myDevice->getServices()->at(0)->getRadius() ){
    	                toBeSwitched->push_back(myDevice);
    	                break;	
    	            }                 
                }
            }
            
            IplImage* img_device = myDevice->getServices()->at(0)->getImage() ; 
            IplImage* img_need   = need->getImage() ; 

            IplImage* img_sum    = cvCreateImage(cvGetSize(img_device),IPL_DEPTH_8U,1); 

            if( !img_device ) {
            cout << "Error load images img_device" << endl ; continue;} 

            if(!img_need) {
            cout << "Error load images img_need" << endl ; continue;} 

            if(!img_sum){
            cout << "Error load images img_sum" << endl ; continue;} 

            printf("img_device      -- Processing a %dx%d image with %d channels\n",img_device->height,img_device->width,img_device->nChannels); 
            printf("img_need        -- Processing a %dx%d image with %d channels\n",img_need->height,img_need->width,img_need->nChannels); 
            printf("img_sum         -- Processing a %dx%d image with %d channels\n",img_sum->height,img_sum->width,img_sum->nChannels);  
          
            cvAnd(img_device, img_need, img_sum);

            /* Pour le debug */
            char path[128] ;
            sprintf(path, "need_debug_img/image.cvAdd.%s.%dpx.png", myDevice->getAddress().c_str() ,  cvCountNonZero(img_sum)); 

            IplImage* img_edge = cvCreateImage( cvGetSize(img_device), 8, 1 );
            IplImage* img_8uc3 = cvCreateImage( cvGetSize(img_device), 8, 3 );

            cvThreshold( img_device, img_edge, 128, 255, CV_THRESH_BINARY );

            CvMemStorage* storage = cvCreateMemStorage();
            CvSeq* first_contour = NULL;

            int Nc = cvFindContours(
                img_edge,
                storage,
                &first_contour,
                sizeof(CvContour),
                CV_RETR_LIST );
            
            for( CvSeq* c=first_contour; c!=NULL; c=c->h_next ){
                cvDrawContours(
                    img_8uc3,
                    c,
                    CV_RGB(250,0,0),        
                    CV_RGB(0,0,255),       
                    1,         
                    2,
                    8 );
            }
            
            IplImage* and3channel = cvCreateImage( cvGetSize(img_device), 8, 3 );
            cvCvtColor( img_sum, and3channel, CV_GRAY2BGR ); // transformation en 3 canaux 

            IplImage* cvAndContour = cvCreateImage( cvGetSize(img_device), 8, 3 );
            cvOr(img_8uc3, and3channel, cvAndContour);
            if(!cvSaveImage(path, cvAndContour)) printf("Could not save: %s\n",path);


        }

        for(int i=0; i< room->getDevices().size() ; i++){   
            bool contains = find( toBeSwitched->begin(), toBeSwitched->end(), room->getDevices().at(i) ) != toBeSwitched->end()  ;
            if(contains){
                if(need->getConstraint() == NEED_CONSTRAINT_MIN ) room->getDevices().at(i)->switchOn() ;
                else if (need->getConstraint() == NEED_CONSTRAINT_MAX ) room->getDevices().at(i)->switchOff() ; 
            } else {
                if(need->getConstraint() == NEED_CONSTRAINT_MIN ) room->getDevices().at(i)->switchOff() ;
                else if (need->getConstraint() == NEED_CONSTRAINT_MAX ) room->getDevices().at(i)->switchOn() ; 
            }
        }
    }    
}
