// File: codegen.go
package main

import (
	"flag"
	"fmt"
	"go/ast"
	"go/parser"
	"go/token"
	"log"
	"os"
)

func main() {
	inputFile := flag.String("input", "", "Input Go file")
	outputFile := flag.String("output", "", "Output Go file")
	flag.Parse()

	if *inputFile == "" || *outputFile == "" {
		log.Fatal("Please provide both input and output file names")
	}

	fset := token.NewFileSet()
	node, err := parser.ParseFile(fset, *inputFile, nil, parser.ParseComments)
	if err != nil {
		log.Fatal(err)
	}

	outFile, err := os.Create(*outputFile)
	if err != nil {
		log.Fatal(err)
	}
	defer outFile.Close()

	fmt.Fprintln(outFile, "// Code generated by codegen.go; DO NOT EDIT.")
	fmt.Fprintln(outFile)
	fmt.Fprintln(outFile, "package main")
	fmt.Fprintln(outFile)

	for _, decl := range node.Decls {
		genDecl, ok := decl.(*ast.GenDecl)
		if !ok || genDecl.Tok != token.TYPE {
			continue
		}

		for _, spec := range genDecl.Specs {
			typeSpec, ok := spec.(*ast.TypeSpec)
			if !ok {
				continue
			}

			structType, ok := typeSpec.Type.(*ast.StructType)
			if !ok {
				continue
			}

			structName := typeSpec.Name.Name
			fmt.Fprintf(outFile, "// Getters and setters for %s\n", structName)

			for _, field := range structType.Fields.List {
				if len(field.Names) == 0 {
					continue
				}

				fieldName := field.Names[0].Name
				fieldType := fmt.Sprintf("%s", field.Type)

				// Generate getter
				fmt.Fprintf(outFile, "func (s *%s) Get%s() %s {\n", structName, fieldName, fieldType)
				fmt.Fprintf(outFile, "    return s.%s\n", fieldName)
				fmt.Fprintf(outFile, "}\n\n")

				// Generate setter
				fmt.Fprintf(outFile, "func (s *%s) Set%s(value %s) {\n", structName, fieldName, fieldType)
				fmt.Fprintf(outFile, "    s.%s = value\n", fieldName)
				fmt.Fprintf(outFile, "}\n\n")
			}
		}
	}
}
