# Adding a new Component
1. Create file in `registry/open-source`
2. Add component code to file. Tailwind is best, but add any utils or css to the single file. Check `registry/utils` for existing utilities.
3. After the imports, add: <br />`// Credit`<br />`// https://[open_source_link]`
1. Add file in `registry/example`, naming it all lowercase and no spaces, `[component_name]example.tsx`
2. Simple export default an Example function that returns a div that takes up the whole screen and centers the component, and implement the component inside the div.
3. Add implementation to `ClientWrapper` component. Recommend using VSCode's `fold all` function and expanding until you get to the `basic` ternary, and expand the 2nd fragment. Clone the first `<Component></Component>` and replace the children and props (tags, name, etc)

# BUILDING THE REGISTRY
##### Do this to add new components to `Open in AI` button
1. Run `npm run generate` to create the `registry.json` file, along with some metadata files
2. Move the generated `registry.json` to the root of the project, replacing the current file.
3. Run `npm run registry:build`  
4. Push the files to the server

