# jquery-form2json
jQuery plugin to marshal a form to JSON representation

### Example usage:

```html
    <!-- Example Implementation -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
    <script src="form2json.js"></script>
        
    <script>
        jQuery(document).ready(function ($) {
            $('[data-customer-form]').on('submit', function (e) {
                e.preventDefault();
                var json = $(this).formToJson({pretty: true});
                console.log(json);
            });
        });
    </script>
    
    <form method="POST" action="/rest/service/customer" data-customer-form>
        <input type="hidden" name="customerId" value="1"/>
    
        <label for="firstName">First Name:</label>
        <input type="text" id="firstName" name="firstName" value="David"/>
    
        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" name="lastName" value="Maple"/>
    
        <label for="streetAddress">Street Address:</label>
        <input type="text" id="streetAddress" name="address.street" value="123 West Main St."/>
    
        <label for="city">City:</label>
        <input type="text" id="city" name="address.city" value="Newtown"/>
    
        <input type="submit" value="SUBMIT" />
    </form>
```