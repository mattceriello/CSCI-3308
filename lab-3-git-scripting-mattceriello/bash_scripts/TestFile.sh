#!/bin/bash
# Author : Matt Ceriello
# Date: 9/16/21
# Script follows here:

count_lines(){
	echo -n "The number of lines is: "
	awk 'END{print NR}' sample_text.txt
	echo hello
}

count_words(){
	#grep -e "Lorem" -e "model" -e "Ipsum" -e "will" sample_text.txt
	grep 'Lorem\|model\|Ipsum\|will' sample_text.txt
	echo hello
}

add_text(){
	echo Please enter a sentence to be added to the text file.
	read input
	echo $input >> sample_text.txt
}

copy(){
	mkdir solution
	cp sample_text.txt solution
}

cma=$1
echo $cma
let inputval="input"
echo $input
if [ "$cma" = "sample_text.txt" ]; then
	echo Correct filename
	while [ "$input" != "5" ]; do
		echo Please choose a funtion to run.
		echo The options are:
		echo "1. count_lines()"
		echo "2. count_words()"
		echo "3. add_text()"
		echo "4. copy()"
		echo "5. exit()"
		echo "Please enter a # 1-5:"
		read input

		case $input in

			1)
				count_lines
				;;

			2)
				count_words
				;;

			3)
				add_text
				echo Exiting.
				exit
				;;

			4)
				copy
				echo Exiting.
				exit
				;;

			5)
				echo Exiting.
				exit
				;;

			*)
				echo otherwise
				;;
		esac
	done
else
	echo Error. Incorrect  filename. Exiting now.
	exit
fi
echo check
