<?
/*** @var $this SubNavBarWidget */
/*** @var $items string[][] */
/*** @var $active string */
?>
<nav class="sub" >
    <ul>

        <? foreach($items as $url => $title): ?>
            <li><a href="<?=bu($url)?>" <?= ($active === $url) ? 'class="active"' : ''?>><?=e($title)?></a></li>
        <? endforeach; ?>

    </ul>
    <div class="clear" ></div>
</nav>
