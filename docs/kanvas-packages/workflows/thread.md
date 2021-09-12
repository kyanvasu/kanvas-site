# Thread

Threads is use to execute all actions within a rule , allowing use to pass data between each action.

So if we have a rule tat runs 2 actions PDF and SendEmail , withing the action handle function or on its Template parsing mechanism we will have the thread reference where we can get past results by calling thread.getResults(actionName)

## Example
```html
    {% set resultsPDF = threads.getResults('PDF') %}
    <a href="{{resultsPDF['ur']}}" >Link</a>
```