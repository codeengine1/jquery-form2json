# jquery-form2json
jQuery plugin to marshal a form to JSON representation

### Example usage:

```html
    <!-- Example Implementation -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
    <script src="jquery-form2json.js"></script>
        
    <script>
        jQuery(document).ready(function ($) {
            $('[data-customer-form]').on('submit', function (e) {
                e.preventDefault();
                var json = $(this).formToJson({pretty: true, delimiter: '.'});
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

### Which will produce:
```json
{
  "customerId": "1",
  "firstName": "David",
  "lastName": "Maple",
  "address": {
    "street": "123 West Main St.",
    "city": "Newtown"
  }
}
```

<a name="symfony-support" />

### New! Support for Symfony array syntax:

```html
    <!-- Example Implementation -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
    <script src="jquery-form2json.js"></script>
        
    <script>
        jQuery(document).ready(function ($) {
            $('[data-customer-form]').on('submit', function (e) {
                e.preventDefault();
                var json = $(this).formToJson({
                    pretty: true,
                    syntax: 'array'
                });
                console.log(json);
            });
        });
    </script>
    
    <form method="POST" action="/rest/service/customer" data-customer-form>
        <input type="hidden" name="form[customerId]" value="1"/>
    
        <label for="firstName">First Name:</label>
        <input type="text" id="firstName" name="form[firstName]" value="David"/>
    
        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" name="form[lastName]" value="Maple"/>
    
        <label for="streetAddress">Street Address:</label>
        <input type="text" id="streetAddress" name="form[address][street]" value="123 West Main St."/>
    
        <label for="city">City:</label>
        <input type="text" id="city" name="form[address][city]" value="Newtown"/>
        
        <input type="checkbox" id="terms" name="form[legal][terms][id]" value="9" />
        <label for="terms">I agree that this form is a sample and has no real world value</label>
    
        <input type="submit" value="SUBMIT" />
    </form>
```

### Which will produce:
```json
{
  "customerId": "1",
  "firstName": "David",
  "lastName": "Maple",
  "address": {
    "street": "123 West Main St.",
    "city": "Newtown"
  }
}
```