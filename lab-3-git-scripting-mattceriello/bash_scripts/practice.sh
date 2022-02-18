#!/bin/bash
# Author : Matt Ceriello
# Date: 9/16/21
# Script follows here: 
echo "Enter a number: "
read numOne 
echo "Enter a second number: "
read numTwo
sum=$(($numOne + $numTwo))
echo "The sum is : $sum"
let prod=numOne*numTwo
echo "The product is: $prod"
echo "File Name: $0"
echo "Command Line Arguement 1: $1"
grep $1 $2

