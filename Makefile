all: run

elm-todomvc/:
	git submodule update --init --recursive

www/elm/Todo.js: elm-todomvc/ elm-todomvc/Todo.elm
	pushd elm-todomvc/; elm make --yes --output ../www/elm/Todo.js Todo.elm; popd

compile: www/elm/Todo.js
	cca build

run: compile
	cca run ios --emulator
	# cca run chrome

distclean:
	rm -rf elm-todomvc/ platforms/ plugins/
