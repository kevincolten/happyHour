<div id="header" data-role="header">
    <h1>Add Special</h1>
    <a href="#" class="ui-btn-left ui-btn ui-btn-inline ui-mini ui-corner-all ui-btn-icon-left ui-icon-carat-l" id="to-list">&nbsp</a>
</div>
<div class="ui-grid-solo">
    <div class="ui-block-a">
        <a href="#" class="ui-btn ui-shadow ui-corner-all" id="add-business">Add Business</a>
    </div>
</div>
<form>
    <div id="businesses-container"></div>
    <input type="hidden" name="business" id="business-details" value="">
    <div class="item-container input-container">
        <fieldset data-type="horizontal" id="event-types">
        </fieldset>
    </div>
    <div class="item-container">
        <fieldset data-type="horizontal" id="event-days" data-mini="true">
        </fieldset>
    </div>
    <div class="item-container">
        <div class="time-container">
            <input type="time" name="event[start_time]" id="start-time">
        </div>
        <div class="time-container">
            <input type="time" name="event[end_time]" id="end-time">
        </div>
    </div>
    <div class="input-container">
        <div id="time">
            <input type="range" id="start-range" class="hidden" min="0" max="1339" value="360" step="15">
            <input type="range" id="end-range" class="hidden" min="0" max="1439" value="1260" step="15">
        </div>
    </div>
    </div>
    <div class="item-container input-container">
        <fieldset data-type="horizontal" id="event-tags" data-mini="true">
        </fieldset>
    </div>
    <br>
    <div class="item-container input-container">
        <fieldset data-type="horizontal" id="items" data-mini="true">
        </fieldset>
    </div>
    <div class="ui-grid-b price-button-container">
        <div class="ui-block-a">
            <label for="half" name="special[half]">
                <input type="checkbox" id="half" value="true" data-mini="true">
                1/2
            </label>
        </div>
        <div class="ui-block-b">
            <input type="text" name="special[price]" id="price">
        </div>
        <div class="ui-block-c">
            <label for="price-off" name="special[off]">
                <input type="checkbox" id="price-off" value="true" data-mini="true">
                off
            </label>
        </div>
    </div>
     <div class="input-container price-container">
        <input type="range" name="special[price]" id="price-slider" min="0.00" max="50.00" value="3.50" step="0.25" class="hidden">
    </div>
    <div class="item-container input-container">
        <fieldset data-type="horizontal" id="special-tags" data-mini="true">
        </fieldset>
    </div>
    <input type="submit" value="Submit">
</form>
