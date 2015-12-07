DOC 						:= $(shell git ls-tree -r --name-only master | grep '.md')

site: $(DOC)

commit: site
	git add $(DOC)
	git commit -m "content: synchronize $$(cat master/.git/refs/heads/master)"

publish: commit
	git push

master:
	git clone --branch master . master

master/%.md: | master
	@echo $<

doc:
	mkdir -p doc

doc/man:
	mkdir -p doc/man

doc/man/%.md: master/doc/man/%.md | doc/man
	echo "---" > $@
	echo "layout: man" >> $@
	echo '---' >> $@
	grep -m1 ^'#\ ' $< >> $@
	echo '' >> $@
	echo '## NAME' >> $@
	grep -m1 ^'#\ ' $< | sed 's/^# //' | sed 's/[^ ][^ ]*/**&**/' >> $@
	echo '' >> $@
	grep -v ^'#\ ' $< | sed 's/.md/.html/' >> $@

doc/%.md: master/doc/%.md | doc
	echo '---' > $@
	echo 'layout: default' >> $@
	echo '---' >> $@
	sed 's/.md/.html/' $< >> $@

readme.md: master/readme.md
	echo '---' > $@
	echo 'layout: default' >> $@
	echo '---' >> $@
	sed 's/.md/.html/' $< >> $@

%.md: master/%.md
	echo '---' > $@
	echo 'layout: default' >> $@
	echo '---' >> $@
	sed 's/.md/.html/' $< >> $@

clean:
	rm -rf $(DOC)
	rm -rf master

.PHONY: clean
