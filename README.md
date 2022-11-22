# Scarab

*Super simple static sites*

- Directory/path based routing

> **Closer to CSR than SSG**
> The current configuration is a proof-of-concept and is simply parsing the pages directory,
> reading the file contents, converting markdown to html and serving via express.


## Next Steps:

- Add support for templates:
  - 





1. Get config from local `scarab.json` file, or set defaults
2. Parse `pages` directory to build dirtmap
3. Spawn safe num of templates as sub processes
4. Print status to terminal




# QUESTIONS
- Should adpaters/templates function as a subprocess? (faster build times)
  - read file contents
  - parse/replace if map provided
  - convert markdown (or yaml, json, .etc) to html files
    - yaml/md: use frontmatter for metadata
    - json: use `"metadata":{}`  
  - send messages on error or completion