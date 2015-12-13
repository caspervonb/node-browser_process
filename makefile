NODE 					?= $(shell which node)
TEST_BROWSER 	?= chrome chromium electron firefox

test:
	$(MAKE) test-detect \
		$(addprefix test-, $(TEST_BROWSER))

test-chrome test-chromium test-electron test-firefox:
	$(MAKE) \
		TEST_BROWSER=$(patsubst test-%,%,$@) \
		test-find \
		test-options \
		test-spawn \
		test-type \

test-%: test/%.js
	$(NODE) $<

.PHONY: test test-%
