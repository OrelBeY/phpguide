<section id="users_rating" class="rblock">
	<h3 id='ratingWidgetTableTitle'>רייטינג משתתפים</h3>
	<br/>
	<table dir="ltr" class="table ratingTable">
	
	<?php 
	
	$icons = array('&#x265b;', '&#x265a;', '&#x2654;', '','');
	
	for($i = 0, $L = sizeof($users); $i < $L; $i++): 
	?>
	
	<tr>
		<td><?=$icons[$i];?></td>
		<td><span><?=e($users[$i]->login)?></span></td>
		<td><?=e($users[$i]->points)?></td>
	</tr>
	
	<?php endfor; ?>
	</table>
	
	
	
	<div id='ratingWidgetHelp' class='ratingWidgetHelp alert alert-info'>
		<b>רייטינג משתמשים</b><br/><br/>
		נקודות הרייטינג מתקבלות על ידי פעולות המשתמש באתר, <br/>
		עזרה לאחרים, שאלת שאלות וכתיבת מדריכים בצורה הבאה:
		
		<br/>
		
		<br/><b>1+</b> על שאלת שאלה
		<br/><b>1+</b> על תשובה לשאלה
		<br/><b>20+</b> על כתיבת מדריך
		<br/><b>2-</b> על שאלה או תשובה שתימחק על ידי המפקחים בתור ספאם
	</div>
</section>