<?php 
/* Template name: FAQ */
get_header(); ?>

<style>
    .page-faq{
        background-color: #d7d7d7;
    }
    .faq-title {
        text-align: center;
        font-size: 1.375rem;
        font-weight: 500;
        margin-bottom: 0.9375rem;
    }

    .faq-list > div {
        border-bottom: 0.07em solid #ededed;
        padding: 1.5em 2em 1.5em 1em;
        background: #fff;
        margin-bottom: 10px;
    } 

    .faq-list > div:last-child {
        border: unset;
    }

    details > summary {
        list-style: none;
    }
    details > summary::-webkit-details-marker {
        display: none;
    }

    summary {
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none; 
        user-select: none;
        transition: all 0.3s ease;
        position: relative;
        padding-left: 30px;
        line-height: 24px;
    }

    summary:hover {
        color: #e31b1b;
    }

    details[open] summary ~ * {
        animation: sweep .5s ease-in-out;
    }

    @keyframes sweep {
        0%    {opacity: 0; margin-left: -10px}
        100%  {opacity: 1; margin-left: 30px}
    }

    details[open] summary {
        color: #e31b1b;
        margin-bottom: 15px;
        position: relative;
    }
    details p{
        padding-left: 25px;
        margin-left: 30px;
        border-left: 2px solid #e31b1b;
        width: calc(100% - 30px);
        display: block;
    }
    details[open] p {
        border-left: 2px solid #e31b1b;
        margin-left: 30px;
        padding-left: 25px;
        opacity: 100;
        transition: all 1s ease;
        width: calc(100% - 30px);
    }

    details[open] summary:after {
        content: "-";
        font-size: 3.2em;
        /* margin: -33px 0.35em 0 0; */
        font-weight: 400;
        line-height: 24px;
        top: -2px;
        
    }

    .faq-body {
        width: 100%;
        max-width: 800px;
        padding: 0 20px;
        margin: 1.875rem auto 60px;
    }

    .faq-list {
        width: 100%;
        margin: auto;
        padding: 0;
    }

    summary::-webkit-details-marker {
        display: none;
    }

    summary:after {
        background: transparent;
        border-radius: 0.3em;
        content: "+";
        color: #e31b1b;
        /* float: left; */
        font-size: 1.8em;
        font-weight: bold;
        /* margin: -0.3em 0.65em 0 0; */
        padding: 0;
        text-align: center;
        width: 25px;
        position: absolute;
        left: 0;
        top: 0;
        line-height: 24px;
    }
    @media screen and (max-width: 767px) {
        summary{
            font-size: 18px;
            line-height: 24px;
        }
        details p,
        details[open] p{
            margin-left: 0px;
            width: 100%;
        }
        @keyframes sweep {
            0%    {opacity: 0; margin-left: -10px}
            100%  {opacity: 1; margin-left: 0px}
        }
    }
</style>
<div class="bg-menu"></div>


<main class="page page-faq">


<div id="faq" class="faq-body">
      <div class="faq-header">
        <h1 class="faq-title">FAQ's</h1>
      </div>
      <div class="faq-list">

        <?php if( have_rows('items_faq') ):
            while ( have_rows('items_faq') ) : the_row();?>
            <div>
                <details>
                <summary title="<?php the_sub_field('question');?>"><?php the_sub_field('question');?></summary>
                <p class="faq-content"><?php the_sub_field('answer');?></p>
                </details>
            </div>
        <?php endwhile; endif; ?>
          <!-- <div>
            <details>
              <summary title="What can I expect at my first consultation?">What can I expect at my first consultation?</summary>
              <p class="faq-content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, molestias similique! Molestiae sapiente omnis, illo facere odit reprehenderit eveniet consequuntur sit minus adipisci temporibus eius inventore quidem. Dignissimos, facere quae. Rem quas a laborum est officia pariatur voluptatum iusto perferendis aut labore fugit magni inventore nulla architecto, velit, facilis itaque.</p>
            </details>
            </div>
          <div>
            <details>
              <summary title="What are your opening hours?">What are your opening hours?</summary>
              <p class="faq-content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos error ea accusantium? Sunt cum in, repudiandae et facere at nesciunt commodi non quia earum libero aliquid labore obcaecati repellendus consequatur! Nesciunt impedit ducimus illum unde optio veritatis atque facere, voluptate a odio asperiores laudantium rerum.</p>
            </details>
            </div>
          <div>
            <details>
              <summary title="Do I need a referral?">Do I need a referral?</summary>
              <p class="faq-content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis quisquam numquam labore explicabo cupiditate laboriosam. Ipsam explicabo possimus illum aspernatur.</p>
            </details>
            </div>
          <div>
            <details>
              <summary title="Is the cost of the appointment covered by private health insurance?">Is the cost of the appointment covered by private health insurance?</summary>
              <p class="faq-content">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo quos quam asperiores enim sequi nihil? Iure blanditiis autem in ratione rerum, sequi cupiditate eos nemo iusto unde eaque voluptatum alias, porro aliquid sunt. Nesciunt veritatis, ex esse tempora laudantium officiis? Quas corrupti a aut sed quaerat, ipsa incidunt tempora velit dolor distinctio repellat tenetur illum consectetur quos veniam eius provident earum doloremque commodi! Minus amet, obcaecati rem, modi accusantium ad, deleniti possimus incidunt laudantium vitae iusto laborum culpa! Similique, repellat.</p>
            </details>
            </div>
          <div>
                <details>
                    <summary title="What are the parking and public transport options?">What are the parking and public transport options?</summary>
                    <p class="faq-content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis quisquam numquam labore explicabo cupiditate laboriosam. Ipsam explicabo possimus illum aspernatur.</p>
                </details>
            </div> -->
      </div>
    </div>

</main>

<?php get_footer(); ?>