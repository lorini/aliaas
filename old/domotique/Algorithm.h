#ifndef ALGORITHM_H
	
	#define ALGORITHM_H
	
	#include "Room.h"
	#include "Need.h" 
	
	using namespace std;

	class Need ;

	class Algorithm {
		
		public:
		    static int version1(Room * room , vector<Need *> * need); 
	    	static int init(Room *) ;
	    	static int _init(vector<Device *> *) ;


	    private: 
	    	static vector<IplImage*> * bruteforceImages ;
	    	Algorithm(); 
	};

    //vector<IplImage*> * Algorithm::bruteforceImages = new vector<IplImage *>() ;

#endif
