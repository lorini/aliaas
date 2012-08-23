PKG_CONFIG_OPENCV = `pkg-config --libs opencv`

NO_COLOR=\033[0m
OK_COLOR=\033[32;01m
ERROR_COLOR=\033[31;01m
WARN_COLOR=\033[33;01m
BLUE_COLOR=\033[36;01m

all: main.o jsoncpp.o House.o base64.o Room.o Device.o ChaconActuator.o X10Actuator.o Actuator.o Point.o Need.o Service.o Algorithm.o
	@echo "\n\r$(BLUE_COLOR)[ ] Linking Object *.o$(NO_COLOR)\c"
	@g++ -lpthread 	main.o Point.o Room.o House.o Actuator.o \
					Device.o ChaconActuator.o X10Actuator.o  \
					jsoncpp.o base64.o Need.o Service.o 	 \
					Algorithm.o -o domotique $(PKG_CONFIG_OPENCV)  2>> errors.log || touch errors.tmp ;

	@if test -e errors.tmp; then \
		echo "\r$(BLUE_COLOR)[$(ERROR_COLOR)X$(BLUE_COLOR)] Linking Object *.o$(NO_COLOR)"  ;\
		rm errors.tmp; \
	else \
		echo "\r$(BLUE_COLOR)[$(OK_COLOR)√$(BLUE_COLOR)] Linking Object *.o$(NO_COLOR)"  ;\
	fi 

	@if test -e errors.log; then 	\
		echo "$(ERROR_COLOR)"; 		\
		cat errors.log; 			\
		echo "$(NO_COLOR)" ;		\
		rm errors.log;  			\
	fi 


main.o : main.cpp
	@echo "\r$(BLUE_COLOR)[ ] Compiling main.cpp$(NO_COLOR)\c"
	@-g++ -c main.cpp 2>> errors.log || touch errors.tmp 

	@if test -e errors.tmp; then \
		echo "\r$(BLUE_COLOR)[$(ERROR_COLOR)X$(BLUE_COLOR)] Compiling main.cpp$(NO_COLOR)\c"  ;\
		rm errors.tmp; \
	else \
		echo "\r$(BLUE_COLOR)[$(OK_COLOR)√$(BLUE_COLOR)] Compiling main.cpp$(NO_COLOR)\c" ; \
	fi 
	
jsoncpp.o : jsoncpp.cpp
	@echo "\n\r$(BLUE_COLOR)[ ] Compiling jsoncpp.cpp$(NO_COLOR)\c"
	@-g++ -c jsoncpp.cpp 2>> errors.log || touch errors.tmp 

	@if test -e errors.tmp; then \
		echo "\r$(BLUE_COLOR)[$(ERROR_COLOR)X$(BLUE_COLOR)] Compiling jsoncpp.cpp$(NO_COLOR)\c"  ;\
		rm errors.tmp; \
	else \
		echo "\r$(BLUE_COLOR)[$(OK_COLOR)√$(BLUE_COLOR)] Compiling jsoncpp.cpp$(NO_COLOR)\c" ; \
	fi 
	
base64.o : base64.cpp
	@echo "\n\r$(BLUE_COLOR)[ ] Compiling base64.cpp$(NO_COLOR)\c"
	@-g++ -c base64.cpp 2>> errors.log || touch errors.tmp 

	@if test -e errors.tmp; then \
		echo "\r$(BLUE_COLOR)[$(ERROR_COLOR)X$(BLUE_COLOR)] Compiling base64.cpp$(NO_COLOR)\c"  ;\
		rm errors.tmp; \
	else \
		echo "\r$(BLUE_COLOR)[$(OK_COLOR)√$(BLUE_COLOR)] Compiling base64.cpp$(NO_COLOR)\c" ; \
	fi 
	
House.o : House.cpp
	@echo "\n\r$(BLUE_COLOR)[ ] Compiling House.cpp$(NO_COLOR)\c"
	@-g++ -c House.cpp 2>> errors.log || touch errors.tmp 

	@if test -e errors.tmp; then \
		echo "\r$(BLUE_COLOR)[$(ERROR_COLOR)X$(BLUE_COLOR)] Compiling House.cpp$(NO_COLOR)\c"  ;\
		rm errors.tmp; \
	else \
		echo "\r$(BLUE_COLOR)[$(OK_COLOR)√$(BLUE_COLOR)] Compiling House.cpp$(NO_COLOR)\c" ; \
	fi 
	
Room.o : Room.cpp
	@echo "\n\r$(BLUE_COLOR)[ ] Compiling Room.cpp$(NO_COLOR)\c"
	@-g++ -c Room.cpp 2>> errors.log || touch errors.tmp 

	@if test -e errors.tmp; then \
		echo "\r$(BLUE_COLOR)[$(ERROR_COLOR)X$(BLUE_COLOR)] Compiling Room.cpp$(NO_COLOR)\c"  ;\
		rm errors.tmp; \
	else \
		echo "\r$(BLUE_COLOR)[$(OK_COLOR)√$(BLUE_COLOR)] Compiling Room.cpp$(NO_COLOR)\c" ; \
	fi 
Device.o : Device.cpp
	@echo "\n\r$(BLUE_COLOR)[ ] Compiling Device.cpp$(NO_COLOR)\c"
	@-g++ -c Device.cpp 2>> errors.log || touch errors.tmp 

	@if test -e errors.tmp; then \
		echo "\r$(BLUE_COLOR)[$(ERROR_COLOR)X$(BLUE_COLOR)] Compiling Device.cpp$(NO_COLOR)\c"  ;\
		rm errors.tmp; \
	else \
		echo "\r$(BLUE_COLOR)[$(OK_COLOR)√$(BLUE_COLOR)] Compiling Device.cpp$(NO_COLOR)\c" ; \
	fi 

Actuator.o : Actuator.cpp
	@echo "\n\r$(BLUE_COLOR)[ ] Compiling Actuator.cpp$(NO_COLOR)\c"
	@-g++ -c Actuator.cpp 2>> errors.log || touch errors.tmp 

	@if test -e errors.tmp; then \
		echo "\r$(BLUE_COLOR)[$(ERROR_COLOR)X$(BLUE_COLOR)] Compiling Actuator.cpp$(NO_COLOR)\c"  ;\
		rm errors.tmp; \
	else \
		echo "\r$(BLUE_COLOR)[$(OK_COLOR)√$(BLUE_COLOR)] Compiling Actuator.cpp$(NO_COLOR)\c" ; \
	fi 
	
ChaconActuator.o : ChaconActuator.cpp
	@echo "\n\r$(BLUE_COLOR)[ ] Compiling ChaconActuator.cpp$(NO_COLOR)\c"
	@-g++ -c ChaconActuator.cpp 2>> errors.log || touch errors.tmp 

	@if test -e errors.tmp; then \
		echo "\r$(BLUE_COLOR)[$(ERROR_COLOR)X$(BLUE_COLOR)] Compiling ChaconActuator.cpp$(NO_COLOR)\c"  ;\
		rm errors.tmp; \
	else \
		echo "\r$(BLUE_COLOR)[$(OK_COLOR)√$(BLUE_COLOR)] Compiling ChaconActuator.cpp$(NO_COLOR)\c" ; \
	fi 

X10Actuator.o : X10Actuator.cpp
	@echo "\n\r$(BLUE_COLOR)[ ] Compiling X10Actuator.cpp$(NO_COLOR)\c"
	@-g++ -c X10Actuator.cpp 2>> errors.log || touch errors.tmp 

	@if test -e errors.tmp; then \
		echo "\r$(BLUE_COLOR)[$(ERROR_COLOR)X$(BLUE_COLOR)] Compiling X10Actuator.cpp$(NO_COLOR)\c"  ;\
		rm errors.tmp; \
	else \
		echo "\r$(BLUE_COLOR)[$(OK_COLOR)√$(BLUE_COLOR)] Compiling X10Actuator.cpp$(NO_COLOR)\c" ; \
	fi 

Point.o : Point.cpp 
	@echo "\n\r$(BLUE_COLOR)[ ] Compiling Point.cpp$(NO_COLOR)\c"
	@-g++ -c Point.cpp 2>> errors.log || touch errors.tmp 

	@if test -e errors.tmp; then \
		echo "\r$(BLUE_COLOR)[$(ERROR_COLOR)X$(BLUE_COLOR)] Compiling Point.cpp$(NO_COLOR)\c"  ;\
		rm errors.tmp; \
	else \
		echo "\r$(BLUE_COLOR)[$(OK_COLOR)√$(BLUE_COLOR)] Compiling Point.cpp$(NO_COLOR)\c" ; \
	fi 

Need.o : Need.cpp 
	@echo "\n\r$(BLUE_COLOR)[ ] Compiling Need.cpp$(NO_COLOR)\c"
	@-g++ -c Need.cpp 2>> errors.log || touch errors.tmp 

	@if test -e errors.tmp; then \
		echo "\r$(BLUE_COLOR)[$(ERROR_COLOR)X$(BLUE_COLOR)] Compiling Need.cpp$(NO_COLOR)\c"  ;\
		rm errors.tmp; \
	else \
		echo "\r$(BLUE_COLOR)[$(OK_COLOR)√$(BLUE_COLOR)] Compiling Need.cpp$(NO_COLOR)\c" ; \
	fi 

Service.o : Service.cpp 
	@echo "\n\r$(BLUE_COLOR)[ ] Compiling Service.cpp$(NO_COLOR)\c"
	@-g++ -c Service.cpp 2>> errors.log || touch errors.tmp 

	@if test -e errors.tmp; then \
		echo "\r$(BLUE_COLOR)[$(ERROR_COLOR)X$(BLUE_COLOR)] Compiling Service.cpp$(NO_COLOR)\c"  ;\
		rm errors.tmp; \
	else \
		echo "\r$(BLUE_COLOR)[$(OK_COLOR)√$(BLUE_COLOR)] Compiling Service.cpp$(NO_COLOR)\c" ; \
	fi 

Algorithm.o : Algorithm.cpp
	@echo "\n\r$(BLUE_COLOR)[ ] Compiling Algorithm.cpp$(NO_COLOR)\c"
	@-g++ -c Algorithm.cpp 2>> errors.log || touch errors.tmp 

	@if test -e errors.tmp; then \
		echo "\r$(BLUE_COLOR)[$(ERROR_COLOR)X$(BLUE_COLOR)] Compiling Algorithm.cpp$(NO_COLOR)\c"  ;\
		rm errors.tmp; \
	else \
		echo "\r$(BLUE_COLOR)[$(OK_COLOR)√$(BLUE_COLOR)] Compiling Algorithm.cpp$(NO_COLOR)\c" ; \
	fi 

clean : 
	@echo "\r$(WARN_COLOR)[ ] Removing objects *.o 			$(NO_COLOR)"
	@-rm *.o 2> /dev/null 



