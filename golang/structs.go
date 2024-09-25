// File: structs.go
package main

//go:generate go run codegen.go -input structs.go -output generated.go

type Person struct {
	Name    string
	Age     int
	Address string
}

type Company struct {
	Name      string
	Location  string
	Employees int
}
