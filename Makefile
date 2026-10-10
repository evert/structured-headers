SOURCE_FILES:=$(shell find src/ -type f -name '*.ts')

.PHONY: build
build: dist/build cjs/index.cjs

.PHONY: clean
clean:
	rm -rf dist/ cjs/ test/httpwg-tests

.PHONY: test
test: lint test/httpwg-tests/list.json dist/build
	node --test

.PHONY: test-debug
test-debug:
	node --test --inspect-brk

.PHONY: lint
lint:
	node_modules/.bin/eslint --quiet 'src/**/*.ts'

.PHONY: fix
fix:
	node_modules/.bin/eslint --quiet 'src/**/*.ts' --fix

.PHONY: watch
watch:
	node_modules/.bin/tsc --watch

dist/build: $(SOURCE_FILES)
	node_modules/.bin/tsc
	@# A fake file to keep track of the last build time
	touch dist/build

cjs/index.cjs: ${SOURCE_FILES}
	mkdir -p cjs
	npx tsup -d cjs --format cjs src/index.ts --dts --sourcemap

test/httpwg-tests/list.json:
	git clone https://github.com/httpwg/structured-header-tests test/httpwg-tests
