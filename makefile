TEST	      						= $(patsubst %.js, run-%.js, $(wildcard test/*.js))
BROWSER								 ?= chrome chromium electron firefox

test: $(addprefix test-, $(BROWSER))

test-chrome:
	@make -k TEST_BROWSER=chrome run-test

test-chromium:
	@make -k TEST_BROWSER=chromium run-test

test-electron:
	@make -k TEST_BROWSER=electron run-test

test-firefox:
	@make -k TEST_BROWSER=firefox run-test

run-test: $(TEST)
run-test/%.js: test/%.js
	@node $<

.PHONY: test
