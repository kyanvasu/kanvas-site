# Thread

The threads or logs, are the output for each Actions, for example when the PDF action is execute the output is the filesystem entity as array.

Actually the thread just can to use in the actions that use Templates, the var is logs and the method is getResults() as params, you must sent the string name of actions.

## Example
```html
    {% set resultsPDF = threads.getResults('PDF') %}
    <a href="{{resultsPDF['ur']}}" >Link</a>
```