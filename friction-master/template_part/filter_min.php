<div class="podbor__tabs" data-filter="mini">
	<div data-one-select data-tabs="767.98" class="tabs">
		<div class="tabs__header">
			<nav data-tabs-titles class="tabs__navigation">
				<button type="button" class="tabs__title _tab-active">
					Search by Application
				</button>
				<button type="button" class="tabs__title">
					Search by Part
				</button>

			</nav>
			<div class="tabs__catalog">
				<div class="tabs__catalog-wrapper">
					<select data-filter="type" name="type" data-class-modif="transparent">
						<option value="1" selected>Passenger cars</option>
						<option value="2">Commercial</option>
						<option value="3">Motorcycles</option>
					</select>
					<select data-filter="region" name="region" data-class-modif="transparent">
						<option value="1" selected>North America</option>
						<option value="2">Canada</option>
						<option value="3">Mexico</option>
					</select>
				</div>
			</div>
		</div>
		<div data-tabs-body class="tabs__content">
			<div class="tabs__body">
				<div class="tabs__body-wrapper">
					<div class="tabs__body-inner">
						<select data-filter="year" name="year" data-class-modif="input1">
							<option value="" selected>Year</option>
						</select>

						<select data-filter="make" name="make" data-class-modif="input2">
							<option value="" selected>Make</option>
						</select>

						<select data-filter="model" name="model" data-class-modif="input3">
							<option value="" selected>Model</option>
						</select>
					</div>
					<script type="text/javascript">
						// (function(w){(w.__fns=w.__fns||[]).push(function($){
							
						// })})(window);
					</script>
				</div>
			</div>

			<div class="tabs__body">
				<div class="tabs__body-wrapper">
					<div class="tabs__body-input5">
						<input type="text" name="form[email]" id="min_form_part_number" data-error="Error" placeholder="Part Number" class="input search-form__input" />

						<button type="submit" class="search-form__button button search-button" id="min_form_submit">
							<svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g><path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
						</button>

					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<script>
jQuery(document).ready(function($) {
	$("#min_form_submit").click(function(){
		let value = $(this).parent().find('input[type="text"]').val();
		
		window.location = '/catalog/?searchdata='+value;
	});
	
	$('#min_form_part_number').keypress(function (e) {
		if (e.which == 13)
		{
			let value = $(this).val();
		
			window.location = '/catalog/?searchdata='+value;
		}
	});
});
</script>