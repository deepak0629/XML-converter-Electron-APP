set FileName=%1


 


soapui2yaml %FileName%

echo %FileName%.yaml

@echo off

:1

if exist %FileName%.yaml (

bzt -gui %FileName%.yaml


 pause


exit

) else (

PING 1.1.1.1 -n 1 -w 2000 >NUL

goto :1

)