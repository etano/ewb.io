<script>
    import Fa from 'svelte-fa'
    import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
    import { faGithub, faLinkedin, faTwitter, faKeybase, faInstagram } from '@fortawesome/free-brands-svg-icons'
</script>

<style>
    #header {
        position: absolute;
        left: 0px;
        bottom: 0px;
        margin: 20px;
        padding: 10px 0 10px 10px;
        display: flex;
        font-size: 14px;
        line-height: 24px;
        color: #999;
        background: white;
        border: 2px solid #2F4858;
        box-shadow: 3px 3px 5px #2F4858;
    }
    #name {
        padding: 0 10px 0 0;
    }
    #divider {
        padding: 0 10px 0 0;
    }
    a:link, a:visited, a:active {
        color: #F97471;
        text-decoration: none;
    }
    a:hover {
        color: #D6668C;
        text-decoration: underline;
    }
    ul, li {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }
    li {
        padding: 0 10px 0 0;
        float: left;
    }
</style>

<div id="header">
    <div id="name">Ethan W. Brown</div>
    <div id="divider">::</div>
    <ul id="nav">
        <li><a href="https://github.com/etano"><Fa icon={faGithub}/></a></li>
        <li><a href="https://www.linkedin.com/pub/ethan-brown/45/a09/435"><Fa icon={faLinkedin}/></a></li>
        <li><a href="https://scholar.google.ch/citations?user=sXEThvMAAAAJ&hl=en"><Fa icon={faGraduationCap}/></a></li>
        <li><a href="https://twitter.com/ethanwbrown"><Fa icon={faTwitter}/></a></li>
        <li><a href="https://keybase.io/ebrown"><Fa icon={faKeybase}/></a></li>
        <li><a href="https://instagram.com/efangs"><Fa icon={faInstagram}/></a></li>
    </ul>
</div>
