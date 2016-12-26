#include "s3e.h"
#include "IwDebug.h"


// Main entry point for the application
int main()
{
    //Initialise graphics system(s)
    

    // Loop forever, until the user or the OS performs some action to quit the app
    while (!s3eDeviceCheckQuitRequest())
    {
        //Update the input systems
        s3eKeyboardUpdate();
        s3ePointerUpdate();

        
        // Your rendering/app code goes here.


        // Sleep for 0ms to allow the OS to process events etc.
        s3eDeviceYield(0);
    }

    //Terminate modules being used
    
    // Return
    return 0;
}
