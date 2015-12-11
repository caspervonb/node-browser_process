DOC := $(shell git ls-tree -r --name-only master | grep '.md')

all: $(DOC)

%.md:
	mkdir -p $(@D)
	echo --- > $@
	echo permalink: `echo $@ | sed 's/.md$$/.html/g; s/readme$$/\//;'` >> $@
	echo --- >> $@
	git show master:$@ | \
		sed -e 's/\[\(.*\)\](\([^:]*\).md)/[\1](\2)/g;' \
				-e 's/\[\(.*\)\](\([^:]*\)readme)/[\1](\2)/g;' >> $@

clean:
	rm -f $(DOC)

.PHONY: clean
