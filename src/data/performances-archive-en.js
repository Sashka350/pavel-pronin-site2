/**
 * performances-archive-en.js — английский перевод текстов спектаклей.
 *
 * Зеркалит src/data/performances-archive.js по slug: те же ключи, те же
 * порядки в массивах. Перевод нужен только для EN-страниц — генератор
 * берёт его исключительно при `isEn` (см. generate-performances.mjs),
 * иначе на русской странице появился бы английский (подводный камень 11).
 *
 * Что переводится: description (описание режиссёра), epigraph (эпиграф),
 * city, premiere (дата премьеры), team (роль и имя), awards, press (заголовок
 * ссылки). title / author / theater остаются в performances-en.js.
 *
 * Это черновик: Паша вычитывает и присылает правки (ТЗ_по_правкам.md 3.10).
 *
 * ВАЖНО: порядок элементов в массивах должен совпадать с русским файлом.
 * Генератор сверяет длины и печатает предупреждение, если они разошлись.
 */
export const performancesArchiveEn = {
  boyhood: {
    epigraph: [
      'A wonderful, irrecoverable time of childhood!',
      'L. N. Tolstoy, "Childhood. Boyhood. Youth"'
    ],
    description: [
      'When it came time to propose the material for my full-scale production in the L. E. Kheifets Studio, I thought for a very long time. The masters told us that the material must burn, that a director must not say "I can stage this" but "I cannot not stage this".',
      'By the fourth year at the Directing Department it seemed as if everything inside me had been burned out, trampled down, wrung out and mixed up, and I honestly did not care what to stage. All I had left was a burning wish to get through this stage and earn the right to call myself a director.',
      'The teacher of the Studio, one of my Teachers both in life and in the theatre, Mikhail Nikolaevich Chumachenko advised me to read several texts, among them the stage adaptation of Tolstoy’s "Boyhood" written by Yaroslava Pulinovich.',
      'And when I had read it, I suddenly remembered my bright, wildly strong and light impressions from reading the original itself. At that moment I somehow realised that this material makes me want to work with it for its own sake. Not to prove something to anyone or to hold my place, but simply to work with it.',
      'At that point I decided to propose exactly this work — though what inspired me was Tolstoy himself rather than Pulinovich’s adaptation, because the adaptation leaned towards a different, more fantastical, absurd solution, and at that moment that interested me not at all, frankly speaking, and I did not understand it. So I used her composition, removed every episode I had doubts about, and added the Tolstoy scenes I felt were missing.',
      'Many moments of the production stay with me: how the circumstances worked out so that I worked not only with actors from our studio but also invited four remarkable students from the studio of Professor A. V. Borodin, People’s Artist of Russia (by then that was already the Acting Department); how we managed both to sew the costumes and to build the scenery with help from GITIS; and how at the final stage of rehearsals our Master, Leonid Efimovich Kheifets, joined us — and simply, very gently and carefully helped us reach the finish.',
      'It is a production made with love, in the best tradition of graduation shows: the young actors do everything, they simply do not sing. And they do it with gusto, with charm and very movingly. Much like the play’s main character, Nikolenka Irtenyev, who enters adulthood from childhood, they move from student life into professional life and believe that only sunshine, light and joy lie ahead!'
    ],
    city: 'Moscow',
    premiere: '15 April 2016',
    team: [
      { role: 'Director', name: 'Pavel Pronin' },
      { role: 'Set designer', name: 'Veronika Ryseva' },
      { role: 'Choreographer', name: 'Almaz Akhmet-Zhan' },
      { role: 'Lighting designer', name: 'Anton Kiselyus' }
    ],
    awards: [],
    press: []
  },

  gagarinway: {
    epigraph: [
      'That’s what, you know, anarchism is.'
    ],
    description: [
      'My first directing work on the stage of a professional theatre happened at the Russian Theatre of Estonia, by invitation of Igor Lysov, who ran it at the time.',
      'Well, he did not invite me personally and specifically — a fifth-year GITIS student — to stage a production. He invited three final-year students of the GITIS Directing Department to his theatre within the Old Future Theatre laboratory, and the dean at the time, Vladimir Baycher (who was also one of the teachers of the L. E. Kheifets Studio, where I studied), had already suggested that I be one of them.',
      'Somehow it was precisely Gregory Burke’s "Gagarin’s Way" that struck me as exactly the right choice: I felt the kinship between the problems of ordinary Scots losing themselves and their identity under globalisation and the difficulties faced by Estonians dissolving into the giant European Union. Igor Lysov backed my choice. In the course of the work it became clear how right I had been — we even changed the characters’ names and the geographical names to local ones, so that the kinship became obvious.',
      'This "uprootedness" and "lostness" filled our production in many ways. First, the production was a laboratory one, which means it goes as an addition, "a burden on top", to the main repertoire and the repertoire plans — so we had to spend extra effort to obtain costumes, scenery, financing and rehearsal time for the actors.',
      'The second reason is that three of the four actors in the production had joined the theatre very recently, so they had not yet settled into the company either, and they brought with them this atmosphere of "separateness".',
      'And the third reason — we were looking for a non-theatre space. The theatre met us halfway. On the one hand, it was convenient for the theatre — our rehearsals and performances did not have to be squeezed into the venues that were already fully occupied by the companies in residence at the time. On the other hand, we had to find an absolutely new space and adapt it for performances. That is what was done — a small red house standing in the theatre’s courtyard (which is why it was called what it was called: the "Red House") was only half in use: on the second floor were hostel rooms for the theatre’s actors (and I lived in one of them), while the ground floor stood empty. There was a fairly large room for the auditorium, and several smaller ones for dressing rooms.',
      'So our production gave the theatre one more venue.',
      'Because the space was intimate, everything happened right in front of the audience — there was no way to lie about a single detail. Even the elements of stage combat we used had been calculated to the centimetre, so that everything was true to life and safe for the actors.'
    ],
    city: 'Tallinn, Estonia',
    premiere: '1 February 2017',
    team: [
      { role: 'Director', name: 'Pavel Pronin' },
      { role: 'Set designer', name: 'Marie-Liis Bunder' }
    ],
    awards: [],
    press: []
  },

  intheceilingthestarsareshining: {
    epigraph: [
      'A poem by Jenny Wilson.',
      'Subject: Swedish. Class: 9 “B”.',
      'Mum, if you die, I will go on living.',
      'For you.'
    ],
    description: [
      'One of the most memorable productions of my life.',
      'The Youth Theatre of Krasnodar (in my view) is among the most vivid youth theatres in Russia. And the theatre’s director at the time, Nikolai Tabashnikov, offers me — a fifth-year student — to put on a full-scale production there, with none of that "laboratory" or "sketch" status.',
      'To be completely honest, he invited me back in my fourth year, and we spent about a year discussing the material — the first example of such thoughtful and attentive attitude to the choice of material, and I remembered it for life.',
      'The only condition was that the material be aimed at teenagers. Such productions are always in short supply in a theatre, because teenagers are a difficult audience — it is hard to hit the mark with them.',
      'After several options we settled on Johanna Tidholm’s novel "Stars Shine on the Ceiling". It is an amazing text, and it still moves and leaves no one indifferent. Because what it actually tells is how a young woman, still almost a girl, is forced to build her life anew after her mother dies of cancer. And the novel begins even before the heroine loses her mother. It is an honest and open conversation with teenagers about loss, about the wounds that fill the teenage years — and about how to go on living.',
      'In order to get permission to stage it, I found Johanna’s contact details myself, got in touch with her — and finally received permission. And I am infinitely grateful to her for her responsiveness and her generosity: she allowed me to use her text free of charge. After all, at the time I was a student, and this production was my diploma work.',
      'There was so much love in the rehearsals, in the work, in the interaction with the workshops — and afterwards we received so many kind words from the audience. It really was a special production.',
      'I wrote the stage adaptation of the novel for this production myself — a fragment of it can be read on the site, and the full text for staging in a theatre can be obtained by getting in touch with me.'
    ],
    city: 'Krasnodar',
    premiere: '20 April 2017',
    team: [
      { role: 'Director', name: 'Pavel Pronin' },
      { role: 'Set designer', name: 'Olga Galitskaya' }
    ],
    awards: [],
    press: [
      { label: '"Stars Shine on the Ceiling" // Kuban News, 19.04.2017' },
      { label: 'The premiere of "Stars Shine on the Ceiling" took place at the Youth Theatre of Krasnodar // TV Channel "Krasnodar", 20.04.2017' },
      { label: 'The "stars" that "shine on the ceiling" will be shown to Krasnodar residents // "Moskovsky Komsomolets" in Kuban, 02.05.2017' }
    ]
  },

  zoikasappartament: {
    epigraph: [
      'Zoya. A pity. And third of all, I am not at home.',
      'Alleluia. But you are at home.',
      'Zoya. I am not here.',
      'Alleluia. But you are home.',
      'Zoya. I am not here.',
      'Alleluia. That is rather strange…'
    ],
    description: [
      'One more enchanted project at the beginning of my creative path. In April 2017 — just at the close of my studies at GITIS — the institute got a new rector, Grigory Anatolyevich Zaslavsky. He has done, and still does, a great deal both for me and for the whole of GITIS — and, in many ways, for the Russian theatre.',
      'So once he asked me: "Would you like to stage a play in Minsk?"',
      'And that is how it all began. It was a remarkable project of the Russian State Theatre Agency and its head at the time, David Smelyansky, and it was called, I think, the "Russian Trace". It consisted of a team of a Russian director and a Russian designer putting on a production in a Russian theatre in one of the countries of the former USSR. In my year that was the M. Gorky National Academic Drama Theatre in Minsk, the capital of Belarus.',
      'We agreed on Bulgakov’s "Zoyka’s Apartment" pretty quickly. Of course we did — I had graduated three months before and everything was within my reach! Even though at that moment the diploma itself was not yet in my hands (I only received it after the premiere).',
      'Twenty-four roles, and some of them doubled! When I came to meet the actors in the production on the theatre’s Small Stage and, stepping straight onto the Small Stage platform and looking into the auditorium, I almost left, frightened that I had walked in on a performance in progress — the house was that full. And those were simply my actors.',
      'So much love, trust and understanding from the whole theatre — and at the same time such demanding expectations of me. Though it went both ways. I knew exactly what I wanted the production to be, and I went for it despite everything.',
      'And I think the effort paid off. A bright, dynamic, wild story full of music and passion about the tragedy of people who found themselves "in between" at the beginning of the last century.'
    ],
    city: 'Minsk, Belarus',
    premiere: '4 November 2017',
    team: [
      { role: 'Director', name: 'Pavel Pronin' },
      { role: 'Set designer', name: 'Anna Rumyantseva' },
      { role: 'Composer', name: 'Alexey Yerenkov' },
      { role: 'Choreographer', name: 'Olga Skvortsova' }
    ],
    awards: [
      'Participant, Baltic Seasons Festival 2018'
    ],
    press: [
      { label: 'Everyone to the theatre: a full house and dancing in the sixth row // Sputnik.by, 04.11.2017' },
      { label: '"A Workshop for Building Plays" // Kultura, 11.11.2017' },
      { label: 'The theatre’s repertoire is joined by another Bulgakov play // Minsk-News, 13.11.2017' },
      { label: 'Ah, Mikhail Afanasyevich, dear // Belarus Today newspaper, 14.11.2017' }
    ]
  },

  comedyoferrors: {
    epigraph: [
      'We were born together, so let us walk together,',
      'Side by side, not overtaking each other on the way.'
    ],
    description: [
      'A telephone call comes through in the office of the GITIS Directing Department. The dean picks up, says a few words. Then he calls me. I am even less talkative on the phone, though more emotional (glad and grateful — let me explain, just in case).',
      'And here I am, travelling on the Moscow–Elista long-distance bus to look over the repertoire of the B. Basangov National Drama Theatre and do the casting. And the title is already in my pocket — one any director would envy, even a beginner. "The Comedy of Errors". William Shakespeare.',
      'Only later did I learn that in every national republic there are always at least two theatres: a Russian one and a national one — and that means something. Only later did I learn that all the national republics are quite different, yet something does unite them: a complete difference from the regions of central Russia. The difference shows in the actors’ work, in their characters, in their make-up of personalities, and in the audience filling the hall. Only much later did I learn what it is like when actors who have not touched verse for more than ten years look at a poem.',
      'This work was bright and memorable. The enormous trust from the theatre’s management, their unconditional help and support — and the mad determination of the core company to work — allowed us to uncover the wild, energetic nature of the thing. A very earthly story, full of physical humour and of very simple but, for that very reason, no less important ideas, it suited the Kalmyk audience perfectly.',
      'We tried to fill this production with local folk colour — from the music and dances to elements of shamanic ritual.',
      'It came out bright, funny and gripping. Just as a good comedy should be.'
    ],
    city: 'Elista',
    premiere: '17 November 2017',
    team: [
      { role: 'Director', name: 'Pavel Pronin' },
      { role: 'Set designer', name: 'Elena Varova' },
      { role: 'Composer', name: 'Arkady Mandzhiev' },
      { role: 'Choreographer', name: 'Irina Samsonova' }
    ],
    awards: [],
    press: [
      { label: 'The National Drama Theatre will stage the premiere of a Shakespeare play // Kalmykia Online, 15.11.2017' }
    ]
  },

  acityinlove: {
    epigraph: [
      'The main city of mine is the one where I grew up,',
      'The one where I grew up,',
      'Here the question is settled.',
      'Wherever I may have to walk on earth,',
      'I will repeat everywhere…'
    ],
    description: [
      'Of course, it is good for a Directing Department student when the teachers of the studio he studies in run theatres — the chance of getting a job after graduation multiplies many times over. That was exactly my case: Mikhail Chumachenko, himself a graduate and, in my time, already a teacher of the L. E. Kheifets Studio, headed the Koleso Drama Theatre in Togliatti.',
      'On the other hand, the greater the responsibility — you not only have to show yourself, but behind you stand the name of your studio and the name of your teacher.',
      'One more aspect — your teacher knows you, naturally, very well, and so the already sensitive relations between the invited director and the theatre’s artistic director become even more delicate.',
      'It must be said that by the time I started on this project, we had been discussing the material for about a year and a half. I would propose something — Mikhail Nikolaevich would reject it or postpone it for the future. I even wrote two (!!) complete stage adaptations of prose (A. Mariengof’s "The Cynics" and C. S. Lewis’s "The Magician’s Nephew"). But we were still looking for material for my production on the big stage.',
      'But while we were still searching, there arose the need to make a small concert for the theatre’s 30th anniversary. And I agreed.',
      'A general concept emerged: on its birthday the theatre gives a gift to the city, not the other way round. We needed a celebration on stage.',
      'If we are talking about a concert, then songs. But songs have to be sung live. And accompanied live too — otherwise it somehow does not feel like a celebration. And so a jazz ensemble, Party-Fon, enters the production.',
      'Songs alone are not enough, they need to be diluted with something else. We need to find texts, pieces, fragments that would bind everything into one. About what? Of course, about love.',
      'Where there are songs, there are dances too. Every vocal number had to be a dance number as well.',
      'That is how we came from a concert for the theatre’s anniversary to a musical with live music and live voices. About love. The time of action is the 1960s, the time when Togliatti became the city of young dreamers.',
      'In 40 days we made a celebratory production that went on delighting the people of the city — and of the whole Samara region — for a long time, in many different ways. And what more could be asked for?',
      'Both stage adaptations I wrote stayed with me — their fragments can be read on the site, and the full text for staging in a theatre can be obtained by getting in touch with me.'
    ],
    city: 'Togliatti',
    premiere: '2 March 2018',
    team: [
      { role: 'Director', name: 'Pavel Pronin' },
      { role: 'Set designer', name: 'Olga Galitskaya' },
      { role: 'Choreographer', name: 'Sofia Gurzhiyeva' },
      { role: 'Music director', name: 'Alexander Ponomaryov' },
      { role: 'Vocal coach', name: 'Marina Kotsko' }
    ],
    awards: [
      'Winner of the audience poll, "Best Production of the 30th Theatre Season"'
    ],
    press: [
      { label: 'The Koleso Theatre will mark its 30th anniversary with the premiere of the musical "A City in Love" // Volga-News information portal, 06.02.2018' },
      { label: 'The Koleso Theatre marked its anniversary with the premiere of a musical // Sova news agency, 06.03.2018' },
      { label: 'In the Togliatti theatre "Koleso" — an anniversary and the premiere of a musical // Togliatti city information portal, 05.03.2018' }
    ]
  },

  parodist: {
    epigraph: [
      'INSPECTOR. You are cornering me. (Pours himself some whisky and drinks it.) Such possibilities open up before people, and they do not use them. I am leaving, seized by a feeling of longing and deep regret.'
    ],
    description: [
      'My first season as a staff director (by title — chief, but in fact — just one more, under the artistic director Mikhail Chumachenko) at the Koleso Theatre was filled with repertoire searches.',
      'We were thinking about what and how we could put on, how best to place ourselves inside the company, to fit into the theatre’s repertoire policy, to make a decisive statement in our new capacity…',
      'And while we were thinking, we decided to try — more or less at random — applying for grants. And one of the applications that worked was an application to the Competition for Support of Contemporary Drama of the Ministry of Culture of Russia. Under the terms of this competition a theatre could receive money for the first staging of a play by an author who writes in Russian. And a collection of plays by Evgeny Vodolazkin fell into my hands.',
      'It must be said that at that exact moment Evgeny Germanovich was thundering across the whole Russian-speaking world as the leading prose writer: everyone was reading "Laurem", "The Aviator" was already out, and many other fine works. His plays, meanwhile, were practically unknown. And so we secured his support and applied. And we won.',
      'At that time the theatre was putting on two productions at once, and there were no resources at all for a third. So we were told that this production would be entirely bought in, with nothing made in the theatre’s workshops; we sourced everything together with the wonderful designer Olga Galitskaya, and I controlled the budget myself — in short, we managed entirely on our own.',
      'A very tenacious company of actors, greedy for work and open to the wildest experiments, gathered for the production. Vodolazkin’s text itself is not simple: it is filled with surprises inside surprises inside surprises. All of this allowed us to make a completely unusual piece of work, which stood apart on the theatre’s Small Stage.',
      'We placed the audience in a circle, organising a small closed world inside: several rooms of a rich house, a street, a fir grove. And all of it was filled with air, see-through, which gave our playing even greater lightness and refinement. The detective story turned into a philosophical parable that made everyone think about what they were living for and what, in general, it means to live…'
    ],
    city: 'Togliatti',
    premiere: '12 December 2018',
    team: [
      { role: 'Director', name: 'Pavel Pronin' },
      { role: 'Set designer', name: 'Olga Galitskaya' }
    ],
    awards: [
      'Winner of the audience poll, "Best Small-Scale Production of the 31st Theatre Season"'
    ],
    press: [
      { label: 'The premiere of "The Parodist" took place at the Koleso Theatre // Nepoleno news source, 15.02.2019' },
      { label: 'The Togliatti theatre will be the first to stage a play by Vodolazkin // Teatr portal, 06.01.2019' },
      { label: 'The premiere of "The Parodist" took place at the Koleso Theatre // Togliatti News, 15.02.2019' }
    ]
  },

  starboy: {
    epigraph: [
      'Goodness does not end,',
      'It always comes back,',
      'And everything works out —',
      'As in a fairy tale! —',
      'Good.'
    ],
    description: [
      'Just as Russia (and the countries linked to it by cultural ties) has the phenomenon of the young spectator’s theatre, there must, presumably, also exist a theatre of the New Year fairy tale.',
      'Its own texts, its own devices, its own scenography — in short, a whole universe of its own, which lives entirely unnoticed (for a professional director) inside the reality of the drama theatre, until you run into it nose to nose. And then you understand that the length of a show is determined not by artistic considerations but by the maximum length of your audience’s sustained attention (and sometimes simply by the size of their gall bladder); you learn what the ominous word "interlude" means in the New Year season for all theatre people, and how essential the round dance around the tree is; you hear where actors’ voices disappear after the third fairy tale of the day, if you insisted on live singing and forbade backing tracks.',
      'And I decided to write the stage adaptation myself. The song lyrics as well. Because why not. And for this I chose the most festive fairy tale imaginable.',
      'I am enormously grateful to everyone who helped me master this field of children’s fairy tales, who gave me hints and explained the laws of the genre to me.',
      'In the end it turned out very bright, fairy-tale-like, fun and festive. We had a blast, packing this production with many interesting solutions and creative experiments: from the first use in the theatre of a full-screen projection grid to constant interactive work with the auditorium, and many other pleasant things.',
      'And the songs and dances came out famously. Half of our young audience filled the aisles and danced the final dance together with the actors — the celebration worked!',
      'A fragment of the stage adaptation of the tale can be read on the site, and the full text for staging in a theatre can be obtained by getting in touch with me.'
    ],
    city: 'Togliatti',
    premiere: '22 December 2018',
    team: [
      { role: 'Director, author of the stage adaptation and the song lyrics', name: 'Pavel Pronin' },
      { role: 'Set designer', name: 'Olga Galitskaya' },
      { role: 'Choreographer', name: 'Natalia Shiryaeva' },
      { role: 'Composer', name: 'Alexey Ponomaryov' }
    ],
    awards: [],
    press: [
      { label: '"The Star-Child" — a New Year fairy tale at the Togliatti theatre "Koleso" // Togliatti News, 24.12.2018' }
    ]
  },

  backtomurder: {
    epigraph: [
      'Memory is the only thread that binds the fragments of this picture together.',
      'But that thread is fragile and unreliable.'
    ],
    description: [
      'If we could find ourselves in the Moscow metro in the 1990s, before the era of mobile phones, half the passengers in a carriage would be reading a book, and that book would be a detective novel. There is no doubt about it. The mad popularity of the short gripping novel, filled with unexpected and often unpredictable plot twists, needs no proof — today we can convince ourselves of this by looking at which genre is the most popular among the series that are now watched in the metro more often than books are read.',
      'So why not in the theatre? Why is the detective genre not turned to so often in the theatre — it is an obvious choice, alongside comedy and the musical. When my turn came to propose material for the big stage, there was one condition: it had to be an audience production (read: a box-office one).',
      'And I turned to the master of the genre, Agatha Christie, to a play that caught me with its vitality and the variety of its characters, the twists of its plot — and the difficulty of staging it. Of course it would! The action unfolds in two time planes: in the present, where a young woman wants to find out the circumstances of her father’s death (by the way, her mother was convicted and executed on the charge of that very death), and in the past, where the murder happens. And this artistic task has to be solved both scenographically and in acting.',
      'And that is already no easy thing — every actor has to play two ages, two stages of their life (and the actress playing the lead role — two roles in all). And all this within a detective story, where every character is hiding something, and where the psychological analysis sometimes dictates one thing while the dramatic and plot necessity dictates something entirely different (if we are talking about acting tasks).',
      'Much later, when I began studying with Anatoly Vasilyev, I realised that such a contradiction was inevitable and that in the space of the drama theatre it is solved by entirely different means.',
      'All the same, we managed to break through on enthusiasm and boldness, which allowed us to make a very beautiful, aesthetically accomplished production. In the end, about love. Surprisingly enough.'
    ],
    city: 'Togliatti',
    premiere: '20 April 2019',
    team: [
      { role: 'Director', name: 'Pavel Pronin' },
      { role: 'Set designer', name: 'Olga Galitskaya' }
    ],
    awards: [],
    press: [
      { label: 'An Agatha Christie puzzle at the Togliatti "Koleso" // TLTgorod.ru, 22.04.2019' },
      { label: 'The premiere of "Back to Murder" will take place at the Koleso Drama Theatre // Samara, BezFormata, 18.04.2019' },
      { label: 'Togliatti will show "Back to Murder" for the last time // DixiNews news agency, 22.01.2021' }
    ]
  },

  timurandhisteam: {
    epigraph: [
      'Keep calm!',
      'You always think about people, and they will repay you in kind.'
    ],
    description: [
      'So, there is a theatre. And not just a theatre — but one of the most famous and oldest young spectators’ theatres in Russia, the Yekaterinburg one.',
      'It has an artistic director, who combines that post with the artistic directorship of the Sevastopol Russian Academic Drama Theatre named after A. V. Lunacharsky.',
      'It also has a director appointed relatively recently — she came to the post from the position of head of the Yekaterinburg education department, having worked her way up through her entire career from a history teacher in a city school.',
      'There is a large company of graduates of different theatre schools and of different outlooks.',
      'This theatre is the native home of one of the major figures of the Russian theatre, O. S. Loevsky.',
      'And I come to this theatre. I am invited to the post of chief director, but it turns out that in fact I am taking the post of just one more director — which is also how the company is introduced to me.',
      'And this is my first production in the new post, after which I must disappear from the theatre for almost half a year, carrying out commitments I had taken on earlier.',
      'What to do in such a situation? The way I have already decided many times before this moment, and the way I will decide many times after — to make things. To work honestly and uncompromisingly in the art of the drama theatre.',
      'A piece of material turns up — A. P. Gaidar’s novella "Timur and His Team". I had always been deeply prejudiced against this author; it seemed to me that he inevitably carried the stamp of ideology and propaganda in his texts. But when I read the novella, I was very strongly surprised. First, it turned out to be excellent young readers’ literature. Second, seen through the prism of the years that have passed, it produced no tendentious impression at all.',
      'Of course, I studied the history of the theatre and the approach to the work of my predecessors — the outstanding practitioners and theoreticians Yu. E. Zhigulsky, V. V. Kokorin, A. A. Praudin. Their work in the theatre and their reflections on children’s theatre showed me a path one could follow and prompted me towards the principles of building productions for audiences of different ages, which I later practically explored in my own work.',
      'So the problem of my own reception of the material was solved — I was fired up by it and roughly understood how I myself could go about it. But I still had to solve the problem of how this material is received directly by today’s audience. And, taking advantage of the opportunities the theatre’s director offered, I set off to meet pupils from different schools (from different, differently endowed districts of Yekaterinburg) and to talk to them about the novella.',
      'These meetings overturned my ideas about the novella — and about my future audience — all over again. It turned out that they had no prejudice against Gaidar or Timur at all — they simply do not take printed text in very well. That is, they do not see a living story or real people behind it, and they do not understand why one should read it at all. Several times the kids told me with conviction that they knew the novella, only for it to turn out later that they had seen one of the film adaptations and were sure that now they knew the story. Not to mention the many questions connected with the realities of our own time and of that time: how to make a phone call, what a telegram even is, and so on.',
      'So in the end I chose "staged discussion" as the genre of this piece. Of course, I did not have the boldness to have the actors hold a direct (and therefore unpredictable) conversation with the audience about the events unfolding before them. The discussion was conducted by the actors themselves, transforming into various characters of the novella in order to argue their point of view. But these conversations rested on the documentary material of my meetings and, of course, on A. P. Gaidar’s text, and they helped to open up this novella as a living, relevant story for modern schoolchildren.',
      'And all of this happened with a wonderful, imaginative, energetic company of actors — very lively, fun and bright.'
    ],
    city: 'Yekaterinburg',
    premiere: '16 October 2019',
    team: [
      { role: 'Director', name: 'Pavel Pronin' },
      { role: 'Designer', name: 'Anatoly Shubin' },
      { role: 'Costume designer', name: 'Olga Gusak' },
      { role: 'Music director', name: 'Alexander Zhemchuzhnikov' },
      { role: 'Lighting designer', name: 'Maria Tsyganova' }
    ],
    awards: [
      'Prize for the actor Vladislav Getze in the "Hope of the Stage" category at the IV All-Russian Youth Theatre Festival named after V. S. Zolotukhin (Barnaul, September 2021)'
    ],
    press: [
      { label: 'The Youth Theatre prepares the premiere of "Timur and His Team" // Yekaterinburg, BezFormata, 04.10.2019' },
      { label: 'A bridge or an abyss? On the production of "Timur and His Team" at the Yekaterinburg Youth Theatre // Yekaterinburg Culture, 15.10.2019' },
      { label: 'Timur and his team of volunteers — the Yekaterinburg Youth Theatre showed its production of Arkady Gaidar’s novella at the Zolotukhin Festival // Vecherniy Barnaul, 23.09.2021' }
    ]
  },

  nutcracker: {
    epigraph: [
      'Tick and tock.',
      'Tick and tock.',
      'Don’t make so much noise!',
      'The mouse king hears everything!'
    ],
    description: [
      'New Year again — and a New Year production again. And once more a problem marked with an asterisk.',
      'First, Sevastopol is a very peculiar city in terms of who its audience is, its tastes and its expectations.',
      'Second, the theatre is a drama theatre — "adult", as they say — but it needs a New Year show.',
      'And third, this show must be such that it can be staged both as an evening performance during the New Year season and as a morning performance during the rest of the year.',
      'The theatre also commissions the material — "The Nutcracker". A drama production, but with Tchaikovsky’s music.',
      'Generally, looking back, I cannot say with confidence that the theatre’s wishes, expressed so gently and tenderly, had to be taken every time (not only in this production) as unconditional instructions. But that is how I was brought up, that is how I grew up — asking straight out is not very skilful, it is better to use diplomatic channels.',
      'It is also curious that it was Grigory Lifanov, the theatre’s chief director and at that moment my immediate boss — since he was then the artistic director of the Yekaterinburg Youth Theatre — who invited me to the production, while it was the theatre’s director who invited the designer. And they say she simply found him through a web search engine. At that moment I clearly realised the need for a clear and precise website about my work and my searches.',
      'So we compose "The Nutcracker" for children and adults, for the New Year and for the repertoire: a drama production set to music from P. I. Tchaikovsky’s ballet "The Nutcracker".',
      'I think we managed to compose a light, bright and festive story that was simple and clear. Unlike, incidentally, Hoffmann’s original tale.',
      'The production taught me a great deal, brought me together with wonderful people and outstanding theatre professionals. I worked with pleasure.'
    ],
    city: 'Sevastopol',
    premiere: '20 December 2019',
    team: [
      { role: 'Director, author of the stage adaptation', name: 'Pavel Pronin' },
      { role: 'Set designer', name: 'Elisey Shepelyov' },
      { role: 'Movement director', name: 'Maxim Pakhomov' },
      { role: 'Composer', name: 'Nikolai Popov' },
      { role: 'Lighting designer', name: 'Taras Mikhalevsky' }
    ],
    awards: [],
    press: [
      { label: 'The best New Year of all: "The Nutcracker" by the Lunacharsky theatre opens the season of wonders // ForPost, 19.21.2019' }
    ]
  },

  warsawmelody: {
    epigraph: [
      'He does not want me to be like everyone else. That is sweet. And natural.',
      'We value rules, but we love exceptions.'
    ],
    description: [
      'Which plays does the modern Russian theatre love?',
      'First, those with a small number of characters. That is "Warsaw Melody".',
      'Second, those with simple settings that can be organised on stage cheaply and easily. That is "Warsaw Melody".',
      'Third, those in which the actors have something to play with. That is "Warsaw Melody".',
      'And finally, those with a bright plot that takes hold of the soul. That is "Warsaw Melody" again.',
      'Do you feel, dear visitor, how many times this play has entered the discussion of material for a future production for reasons that have nothing to do with creativity? There are several other plays like this, for different combinations and ages, that come up regularly in conversation about an intimate, inexpensive production (how much creativity there is in those definitions). And all of them are, naturally, disfigured by such a stage story and inevitably carry the trail of such, well, "special" plays.',
      'But this time the story was completely different. Students of the Acting Department of the studio of Vladimir Andreyev, People’s Artist of Russia, at GITIS showed a self-directed excerpt in their second year, it seems. And in their fourth year their Master decided to make this production and asked GITIS rector G. A. Zaslavsky to find a director. And he invited me (for which I am immensely grateful to him).',
      'And we took on this play precisely for artistic reasons. It was a remarkable, subtle and tender piece of work during the rehearsals. We talked a lot — we rehearsed little. We invented a lot, discussed a lot. We wrested the time for our meetings away from the course teachers — so that some boy from outside could try to create something with two students of the course.',
      'Together with the wonderful Olga Galitskaya we composed the space and the general atmosphere of our production.',
      'And I think we managed to stage this story in our own way. We made good, very moving work, which could have had a great career, if only the premiere had not taken place on 1 February 2020 but on some other date. The production lived for two months — and then…',
      'In June the kids graduated from GITIS.'
    ],
    city: 'Moscow',
    premiere: '1 February 2020',
    team: [
      { role: 'Director', name: 'Pavel Pronin' },
      { role: 'Set designer', name: 'Olga Galitskaya' },
      { role: 'Lighting designer', name: 'Sofia Larina' }
    ],
    awards: [],
    press: [
      { label: 'The GITIS Training Theatre will present the premiere of "Warsaw Melody" based on the play by Leonid Zorin // ArtMoskovia.ru, 30.01.2020' },
      { label: '1 February — the premiere at the Training Theatre // GITIS website, 28.01.2020' },
      { label: '"Warsaw Melody", dir. Pavel Pronin, GITIS, V. Andreyev’s studio, acting // Live Journal, 02.02.2022' },
      { label: '"Warsaw Melody" will sound at GITIS // KinoTeatr.ru, 30.01.2020' }
    ]
  }
};