<% console.log(event) %>
<a href="index.html">
  <h2><%= event.business.name %> (<%= event.name %>)</h2>
  <p>
    <strong>
      <% _.each(event.specials, function(special) { %>
        <%= special.item %> - <%= special.price %>
      <% }); %>
    </strong>
  </p>
  <p>
    <%= event.business.address %> <strong>&#8226;</strong> <%= event.business.phone %> <strong>&#8226;</strong> <%= event.business.website %>
  </p>
  <p class="ui-li-aside">
    <strong>
      <%= event.start_time %> - <%= event.end_time %>
      <%= event.now ? "now!" : "" %>
    </strong>
  </p>
</a>