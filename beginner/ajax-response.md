### original events

ajax:before   // fires before the request starts, provided a URL was provided in href or action
ajax:loading  // fires after the AJAX request is created, but before it's sent
ajax:success  // fires after a response is received, provided the response was a 200 or 300 HTTP status code
ajax:failure  // fires after a response is received, if the response has a 400 or 500 HTTP status code
ajax:complete // fires after ajax:success or ajax:failure
ajax:after    // fires after the request events are finished

### new events with ujs driver

ajax:beforeSend // equivalent to ajax:loading in earlier versions
ajax:success
ajax:complete
ajax:error // equivalent to ajax:failure in earlier versions
