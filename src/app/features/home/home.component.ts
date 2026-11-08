import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ACTIVITY_REPOSITORY } from '../../domain/repositories/activity.repository';
import { DomainInfo, Opportunity } from '../../domain/models/activity.model';
import { DomainGlyphComponent, DOMAIN_COLORS } from '../../shared/components/domain-glyph.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, DomainGlyphComponent],
  template: `
    <!-- HERO -->
    <section class="hero">
      <div class="container hero-grid">
        <div class="hero-copy">
          <span class="eyebrow on-dark">Programme de l'Institut français du Cameroun</span>
          <h1>Un programme pour révéler les <em>talents</em> de demain</h1>
          <p class="lead">
            La créativité est une force, et chaque jeune mérite de pouvoir développer son potentiel.
            Mboa Jeunes Créatifs offre aux jeunes de moins de 35 ans, à Yaoundé et à Douala,
            un espace d'expression, de formation et de création.
          </p>
          <div class="actions">
            <a routerLink="/communaute" class="btn btn-primary btn-lg">Rejoindre la communauté</a>
            <a routerLink="/activites" class="btn btn-outline btn-lg on-dark">Explorer les domaines</a>
          </div>
          <p class="hero-links">
            <a routerLink="/programme">Découvrir le programme</a>
            <span aria-hidden="true">·</span>
            <a routerLink="/opportunites">Découvrir les opportunités</a>
          </p>
        </div>

        <div class="capsules" aria-hidden="true">
          <div class="cap c1"><app-domain-glyph domain="musique" [size]="54" /></div>
          <div class="cap c2"><app-domain-glyph domain="mode" [size]="54" /></div>
          <div class="cap c3"><app-domain-glyph domain="numerique" [size]="54" /></div>
          <div class="cap c4"><app-domain-glyph domain="arts_visuels" [size]="54" /></div>
          <span class="dot d1"></span><span class="dot d2"></span><span class="dot d3"></span>
        </div>
      </div>
      <div class="pattern-band-light" aria-hidden="true"></div>
    </section>

    <!-- MESSAGES CLÉS -->
    <section class="messages">
      <div class="container grid3">
        <article>
          <span class="num">01</span>
          <h2>Pour les jeunes et les étudiants</h2>
          <p>Un programme destiné aux jeunes, notamment aux étudiants intéressés par les industries culturelles et créatives.</p>
        </article>
        <article>
          <span class="num">02</span>
          <h2>Se former, essayer, rencontrer</h2>
          <p>Formations, ateliers, rencontres et opportunités pour développer ses compétences et ses projets.</p>
        </article>
        <article>
          <span class="num">03</span>
          <h2>Une information accessible</h2>
          <p>Découvrir le programme et y participer simplement : tout est réuni ici.</p>
        </article>
      </div>
    </section>

    <!-- DOMAINES -->
    <section class="domains">
      <div class="container">
        <header class="section-head">
          <span class="eyebrow">Industries culturelles et créatives</span>
          <h2>Sept domaines, mille façons de créer</h2>
          <p>La créativité prend plusieurs formes. Choisissez l'univers qui vous appelle.</p>
        </header>

        <div class="domain-grid">
          @for (d of domains(); track d.key) {
            <a class="domain" [routerLink]="['/activites']" [fragment]="d.key" [style.--c]="color(d.key)">
              <span class="icon"><app-domain-glyph [domain]="d.key" [size]="38" /></span>
              <h3>{{ d.name }}</h3>
              <p>{{ d.tagline }}</p>
              <span class="more">Découvrir →</span>
            </a>
          }
        </div>
        <p class="note">Les activités effectivement proposées varient selon les villes, les périodes et la programmation.</p>
      </div>
    </section>

    <!-- OPPORTUNITÉS -->
    <section class="opps">
      <div class="container">
        <header class="section-head row">
          <div>
            <span class="eyebrow on-dark">Agenda</span>
            <h2>Opportunités à suivre</h2>
          </div>
          <a routerLink="/opportunites" class="btn btn-outline on-dark">Tout l'agenda →</a>
        </header>

        <div class="opp-grid">
          @for (o of opportunities(); track o.id) {
            <article class="opp" [style.--c]="color(o.domain)">
              <span class="stripe"></span>
              <p class="meta">{{ o.domainLabel }} · {{ o.city }}</p>
              <h3>{{ o.title }}</h3>
              <p>{{ o.summary }}</p>
              <div class="foot">
                @if (o.startDate) { <span class="date">{{ o.startDate }} → {{ o.endDate }}</span> }
                <span class="demo">Exemple fictif</span>
              </div>
            </article>
          }
        </div>
      </div>
    </section>

    <!-- CTA POOL -->
    <section class="cta">
      <div class="container cta-box">
        <div>
          <span class="eyebrow">Pool de talents</span>
          <h2>Faites partie de la communauté</h2>
          <p>Laissez votre profil pour être identifié lors des prochains ateliers et appels. L'inscription au Pool ne vaut pas candidature à une activité.</p>
        </div>
        <a routerLink="/communaute" class="btn btn-secondary btn-lg">Découvrir le formulaire de démo →</a>
      </div>
    </section>
  `,
  styles: [`
    .hero { background: var(--ink); color: var(--text-on-dark); overflow: hidden; }
    .hero-grid { display: grid; grid-template-columns: 1.15fr 1fr; gap: 2rem; align-items: center; padding-block: 4.5rem 4rem; }
    .hero h1 { color: var(--text-on-dark); font-size: clamp(2.4rem, 5.4vw, 4.3rem); }
    .hero h1 em { font-style: italic; color: var(--orange); }
    .lead { font-size: 1.15rem; color: var(--text-on-dark-muted); max-width: 34rem; margin-bottom: 1.75rem; }
    .actions { display: flex; flex-wrap: wrap; gap: .8rem; margin-bottom: 1.4rem; }
    .hero-links { color: var(--text-on-dark-muted); font-size: .92rem; display: flex; gap: .6rem; flex-wrap: wrap; }
    .hero-links a { color: var(--ochre); text-decoration: underline; }

    .capsules { position: relative; height: 430px; }
    .cap { position: absolute; width: 140px; height: 360px; border-radius: 999px; transform: rotate(28deg);
           display: flex; align-items: center; justify-content: center; color: var(--ink); box-shadow: 0 20px 40px -20px #000; }
    .cap > * { transform: rotate(-28deg); }
    .c1 { background: var(--orange); left: 0; top: 18px; }
    .c2 { background: var(--red); left: 24%; top: 50px; color: #fff; }
    .c3 { background: var(--green); left: 48%; top: 14px; color: #fff; }
    .c4 { background: var(--cyan); left: 72%; top: 56px; }
    .dot { position: absolute; border-radius: 50%; }
    .d1 { width: 22px; height: 22px; background: var(--ochre); left: 0; top: 0; }
    .d2 { width: 14px; height: 14px; background: var(--cyan); left: 48%; bottom: 0; }
    .d3 { width: 18px; height: 18px; background: var(--red); right: 0; bottom: 30px; }

    .messages { padding: 4.5rem 0 2rem; }
    .grid3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 2.5rem; }
    .messages article { border-top: 4px solid var(--ink); padding-top: 1.2rem; }
    .messages article:nth-child(1) { border-color: var(--red); }
    .messages article:nth-child(2) { border-color: var(--orange); }
    .messages article:nth-child(3) { border-color: var(--cyan); }
    .num { font-family: var(--font-display); font-size: 2.6rem; font-weight: 800; color: var(--ink); opacity: .18; line-height: 1; display: block; }
    .messages h2 { font-size: 1.45rem; margin: .3rem 0 .6rem; }
    .messages p { color: var(--text-muted); margin: 0; }

    .domains { padding: 4rem 0 2rem; }
    .section-head { max-width: 40rem; margin-bottom: 2.25rem; }
    .section-head.row { max-width: none; display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 1rem; }
    .section-head p { color: var(--text-muted); font-size: 1.05rem; margin: 0; }
    .domain-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 1.25rem; }
    .domain { --c: var(--orange); display: flex; flex-direction: column; background: var(--white); color: var(--text);
              border: 1px solid var(--line); border-radius: var(--radius-leaf); padding: 1.5rem; text-decoration: none;
              position: relative; overflow: hidden; transition: transform .15s, box-shadow .15s; }
    .domain::before { content: ''; position: absolute; right: -34px; top: -34px; width: 110px; height: 110px; border-radius: 50%; background: var(--c); opacity: .16; }
    .domain:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); text-decoration: none; }
    .icon { width: 64px; height: 64px; border-radius: 22px 6px 22px 6px; background: var(--c); color: var(--ink);
            display: flex; align-items: center; justify-content: center; margin-bottom: 1.1rem; position: relative; }
    .domain h3 { font-size: 1.15rem; margin-bottom: .35rem; }
    .domain p { color: var(--text-muted); font-size: .9rem; flex: 1; }
    .more { font-weight: 700; font-size: .85rem; color: var(--ink); }
    .note { margin-top: 1.5rem; font-size: .85rem; color: var(--text-muted); font-style: italic; }

    .opps { background: var(--ink); color: var(--text-on-dark); padding: 4.5rem 0; margin-top: 4rem; }
    .opps h2 { color: var(--ochre); margin: 0; }
    .opp-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(290px, 1fr)); gap: 1.5rem; }
    .opp { --c: var(--orange); background: var(--ink-2); border: 1px solid var(--line-dark); border-radius: var(--radius-leaf); padding: 1.6rem; position: relative; display: flex; flex-direction: column; }
    .stripe { position: absolute; left: 0; top: 24px; bottom: 24px; width: 5px; border-radius: 5px; background: var(--c); }
    .opp .meta { font-size: .75rem; letter-spacing: .1em; text-transform: uppercase; color: var(--c); font-weight: 700; margin-bottom: .5rem; }
    .opp h3 { color: var(--text-on-dark); font-size: 1.3rem; }
    .opp p { color: var(--text-on-dark-muted); font-size: .92rem; flex: 1; }
    .foot { display: flex; justify-content: space-between; align-items: center; gap: .5rem; flex-wrap: wrap; border-top: 1px solid var(--line-dark); padding-top: .9rem; font-size: .8rem; }
    .date { color: var(--text-on-dark); }
    .demo { color: var(--ink); background: var(--ochre); border-radius: 999px; padding: .1rem .55rem; font-weight: 700; font-size: .7rem; }

    .cta { padding: 4rem 0 0; }
    .cta-box { background: var(--ochre); border-radius: var(--radius-lg) 6px var(--radius-lg) 6px; padding: 3rem; display: flex; align-items: center; justify-content: space-between; gap: 2rem; flex-wrap: wrap; }
    .cta-box > div { max-width: 38rem; }
    .cta h2 { margin-bottom: .6rem; }
    .cta p { margin: 0; color: var(--ink-3); }
    .cta .eyebrow { color: var(--ink); }

    @media (max-width: 900px) {
      .hero-grid { grid-template-columns: 1fr; padding-block: 3rem 2.5rem; }
      .capsules { height: 300px; }
      .cap { width: 100px; height: 260px; }
    }
  `]
})
export class HomeComponent implements OnInit {
  private readonly repo = inject(ACTIVITY_REPOSITORY);
  readonly domains = signal<DomainInfo[]>([]);
  readonly opportunities = signal<Opportunity[]>([]);

  color(key: string): string { return DOMAIN_COLORS[key] ?? '#f08a00'; }

  async ngOnInit(): Promise<void> {
    const [d, o] = await Promise.all([this.repo.getDomains(), this.repo.getOpportunities()]);
    this.domains.set(d);
    this.opportunities.set(o);
  }
}
