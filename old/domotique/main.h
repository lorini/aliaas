#ifndef MAIN_H
#define MAIN_H

void signal_handler(int);

/* THREADS */
void * commandExecutor(void * data);
void * stateObservator(void * data);
void * commandReceiver(void * data);
void * sendChangeState(void * data);
void * nodeJs(void * data);

/* FUNCTIONS */
House  * load();
void     save(House *);
void     exec_command(Json::Value);
Device * findDeviceWithAddress(string);
Room   * findRoomWithName(string);
void 	 hash(char*, int);
void 	 save_image(const char *, string);
#endif
