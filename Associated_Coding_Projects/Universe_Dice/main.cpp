#include <iostream>
#include <ctime>
#include <vector>
#include <fstream>

using namespace std;

void Compend(fstream &dat, vector<string> Aroster);
string Pick_flavor(bool Ancien);
void Make_Lists(fstream &dat, vector<string> &alien);

int main()
{
    int number;
    fstream dict,roster;
    string AlienList,outf;
    vector<string> AlienRoster;
    cout<<"What do you want to name your file?"<<endl;
    cin>>outf;
    dict.open(outf,fstream::out);
    cout<<"Which alien roster are you using?"<<endl;
    cin>>AlienList;
    roster.open(AlienList);
    Make_Lists(roster,AlienRoster);
    cout<<"How many verses you want?"<<endl;
    cin>>number;
    for(int i = 0; i < number; i++)
    {
        dict<<"Universe #"<<(i + 1)<<endl;
        dict<<"=========================================\n"<<endl;

        Compend(dict,AlienRoster);
    }
    dict.close();
    return 0;
}

void Compend(fstream &dat, vector<string> Aroster)
{
    string scale,alien,galaxy,FTL,Human,Scenario,scaleflav,scaleflav2,invaderRole;
    //Factors, used to make alternate scenarios in light of what exists in the universe.
    //Critters refers to aliens of development less than that of us.  Primitive civilizations bound to a planet are usually a given,
    //Unless things are truly desolate.
    bool Gardens = false;
    bool infested = false;
    bool pick = false;
    bool eldritch = false;
    bool primitives = true;
    //Aliens refers to other civilizations of comparable development or greater than that of humans.
    bool SpaceAliens = true;
    //Ancients refers to other civilizations of development far greater than our own.
    bool HuAncients = false;
    bool Ancients = false;
    //How much time is there?
    int TimeDice = rand()%1000 + 1;
    //Setting Scale
    int ScaleDice = rand()%5 + 1;
    //Alien quantity
    int AlienDice = rand()%13;
    //What is the natural Galaxy like?
    int GalaxyDice = rand()%5 + 1;
    //Optional roll, appends a secondary scenario.
    //int Galaxy2Dice = rand()%4 + 1;
    //What is the FTL system?
    int FTLDice = rand()%5 + 1;
    //May be used on FTLDice to get multiple FTL systems
    int ReRollDice = rand()%3;
    //Human situation!
    int HumanityDice = rand()%4 + 1;
    //Scenarios for the developed galaxy!
    int ScenarioDice = rand()%4 +1;
    cout<<"Scale: "<<ScaleDice<<endl;
    cout<<"Alien: "<<AlienDice<<endl;
    cout<<"Galaxy: "<<GalaxyDice<<endl;
    cout<<"FTL: "<<FTLDice<<endl;
    cout<<"ReRolls: "<<ReRollDice<<endl;
    cout<<"Human: "<<HumanityDice<<endl;
    cout<<"Scenario: "<<ScenarioDice<<endl;
    //int Adice = AlienDice/2;
    //Roles get assigned up here.
    /*for(int i = 0; i < Aroster.size(); i++)
    {
        if(i == Aroster.size()-1 || AlienDice == 0)
        {
            if(AlienDice > 0)
            {
                invaderRole = "Humans";
            }
            else
            {
                invaderRole = "other Humans";
            }
        }
        if(rand()%Adice == 0)
        {
            invaderRole = Aroster.at(i);
        }
    }*/

    /*int j = 0;
    for(unsigned i = 0; i < Aroster.size(); i++)
    {
        string tmp = Aroster.at(i);
        int coin = rand()%2;
        if(j < AlienDice && coin == 0)
        {
            dat<<tmp<<endl;
            j++;
        }
        if(j == AlienDice)
        {
            break;
        }
    }*/

    switch(TimeDice)
    {

    }

    switch(ScaleDice)
    {
        case 1: scale = "Galactic scale\n";
                scaleflav2 = "Galactic";
                scaleflav = "Galaxy";
                TimeDice*=18;
                break;
        case 2: scale = "The whole local group\n";
                        scaleflav = "known Universe";
                        scaleflav2 = "Intergalactic";
                        AlienDice*=2.5;
                        TimeDice*=36;
                        break;
        case 3: scale = "Quadrant scale\n";
                        scaleflav = "known Galaxy";
                        scaleflav2 = "Interstellar";
                        AlienDice/=2;
                        TimeDice*=6;
                        break;
        case 4: scale = "Nearby Stars\n";
                        scaleflav = "known Galaxy";
                        scaleflav2 = "Interstellar";
                        AlienDice/=4;
                        primitives = false;
                        TimeDice*=2;
                        break;
        case 5: scale = "Interplanetary\n";
                        scaleflav = "entire System";
                        scaleflav2 = "Interplanetary";
                        AlienDice/=6;
                        primitives = false;
                        break;
       default: scale = "Who knows?\n";
                        scaleflav = "known Universe";
                        scaleflav2 = "Vast";
                        TimeDice*=18;
    }
    if(AlienDice > 0)
    {
        if(rand()%3 == 0)
        {
            invaderRole = "Humans";
        }
        else
        {
            invaderRole = "Aliens";
        }
    }
    else
    {
        invaderRole = "Humans";
    }

    switch(AlienDice)
    {
        case 0: alien = "There are no alien civilizations out there.\n";
                        SpaceAliens = false;
                        break;
        case 1: alien = "There is only one alien civilization out there.\n";
                        break;
        default: alien = "There are ";
                 alien += to_string(AlienDice);
                 alien += " alien civilizations out there.\n";
    }

    switch(GalaxyDice)
    {
        case 1: galaxy = "The universe is rich and hospitable, it is truly a cosmic ocean.\nFor in the fugue of gaian worlds permeating the stars, art has been made from the darwinians struggles of life.\n";
                if(rand()%3 == 0 && AlienDice > 1)
                {
                    galaxy+= "This is all a product of the ancients.\n";
                    Ancients = true;
                }
                if(AlienDice == 1)
                {
                      galaxy+="However, expect a friend.\n";
                }
                if(AlienDice > 1)
                {
                    galaxy+="However, expect some friends.\n";
                }
                if(rand()%5 == 0 && AlienDice > 1)
                {
                    galaxy+= "And some pests.\n";
                    infested = true;
                }
                Gardens = true;
                break;
        case 2: galaxy = "The universe is as harsh as we imagined it.\nLife struggles in this cosmic desert and only the most ruthless has thrived.\nHabitability is low and every world like Earth is an oasis, as savage as the locals will prove to be.\n";
            if(AlienDice == 1)
            {
                galaxy+="Also, expect a rival.\n";
            }
            if(AlienDice > 1)
            {
                galaxy+="Also, expect some rivals.\n";
            }
            if(rand()%3 == 0)
            {
                galaxy+= "Along with reality bending abominations who defy all logic or reason.\n";
                eldritch = true;
            }
            if(rand()%5 == 0 && AlienDice > 1)
            {
                galaxy+= "And swarms of vicious creatures and machines who have been strip mining the " + scaleflav + ".\n";
                infested = true;
            }
                break;
        case 3: if(SpaceAliens == false)
                {
                    galaxy = "The universe is desolate.\nEvery earth an abortion, cellular life is the norm and any earth-like world is always incompatible.\nNo habitability.\n";
                    primitives = false;
                    if(rand()%3 == 0)
                    {
                        galaxy+= "And the universe is also physically contradictory by nature.  There is no logic like we thought.\nWe are the true anomaly!\n";
                        eldritch = true;
                    }
                }
                else
                {
                    galaxy = "The Universe is incoherent.\nThere are worlds thriving with alien life out there, many, but it is all incoherent madness.\nThe laws of physics don't hold up, time is relative and life takes on impossible forms regularly.\n";
                    eldritch = true;
                    if(rand()%3 == 0 && AlienDice > 1)
                    {
                        galaxy+= "And it is the fault of the ancients.\n";
                        Ancients = true;
                    }
                    if(rand()%3 == 0 && AlienDice > 1)
                    {
                        galaxy+= "Worse, the galaxy is infested in swarms of unknown entities.\n";
                        infested = true;
                    }
                }
                break;

        case 4: if(SpaceAliens == false)
                {
                    galaxy = "The universe is strange.\n  Worlds like ours are a reoccuring feature.\n While life does thrive on many worlds,\n intelligent life is starkly absent beyond primitives.\n  We seem to have come first.\n";
                }
                else
                {
                    galaxy = "The Universe is sick.\nWorld after world, you find expansionistic swarms of animalistic entities be it mechanical or organic in nature.\nWhole ecosystems of them thrive throughout the known universe and they pose an omnipresent trouble to any would be civilization.\nHabitability is common, however.\n";
                    infested = true;
                    if(rand()%5 == 0)
                    {
                        galaxy+= "At the very least, many worlds are habitable...  Until they are devoured.\n";
                        Gardens = true;
                    }
                    if(rand()%3 == 0)
                    {
                        galaxy+= "The very fabric of reality itself is rotting away.\n";
                        eldritch = true;
                    }
                    if(rand()%3 == 0)
                    {
                        galaxy+= "And the origin of these swarms are far from natural.\n";
                        Ancients = true;
                    }

                }
                break;

        default: galaxy = "The galaxy is ancient and decrepit.  Ruins of ancient civilizations fill the galaxy, after ages of galactic civilizations.\n";

                 galaxy += "These ancients are responsible for:\n";
                 int anc = rand()%4;
                 int j = 0;
                 int rolls = rand()%3;
                 while(j < rolls)
                 {
                     switch(anc)
                     {
                        case 1: galaxy += "Destroying the very fabric of reality itself.\n";
                                eldritch = true;
                                if(j < rolls)
                                {
                                    j++;
                                    anc = rand()%4;
                                    continue;
                                }
                                else
                                {
                                    break;
                                }
                        case 2: galaxy += "Causing the infestation which permeates the " + scaleflav + ".\n";
                                infested = true;
                                if(j < rolls)
                                {
                                    j++;
                                    anc = rand()%4;
                                    continue;
                                }
                                else
                                {
                                    break;
                                }
                        case 3: galaxy += "Terraforming numerous worlds " + scaleflav + ".\n";
                                Gardens = true;
                                if(j < rolls)
                                {
                                    j++;
                                    anc = rand()%4;
                                    continue;
                                }
                                else
                                {
                                    break;
                                }
                      default: galaxy += "Making massive structures.";
                               if(j < rolls)
                                {
                                   j++;
                                   anc = rand()%4;
                                   continue;
                                }
                                else
                                {
                                    break;
                                }
                     }
                 }
                 if(AlienDice == 1)
                 {
                     if(rand()%3 == 0)
                     {
                         galaxy+="And we are the ancients to the a recent upstart civilization...\n";
                         HuAncients = true;
                     }
                     else
                     {
                         galaxy+="And we are not the only scavenger.\n";
                         Ancients = true;
                     }
                 }
                 else if(AlienDice > 1)
                 {
                     if(rand()%3 == 0)
                     {
                         galaxy+="And we are the ancients to the upstarts around us.\n";
                         HuAncients = true;
                     }
                     else
                     {
                         galaxy+="And we are not the only scavengers.\n";
                         Ancients = true;
                     }
                 }
                 else
                 {
                     galaxy+="And we are those ancients.\n";
                     HuAncients = true;
                 }
    }


    switch(HumanityDice)
    {
        case 1: Human = "Humans are the dominant force.\n";
                        break;
        case 2: Human = "Humans are a major force.\n";
                        break;
        case 3: Human = "Humans are a minor force.\n";
                        break;
        case 4: Human = "Humans are insignificant.\n";
                        break;
       default: Human = "There are no humans.\nOnly machines.\n";
                        if(infested == true)
                        {
                            Human+="And we are to devour the galaxy.\n";
                        }
                        else if(eldritch == true)
                        {
                            Human+="Fv'to'suu!\n";
                        }
                        else
                        {
                            break;
                        }

    }

    int i = 0;
    FTL = "\nYou have the following FTL Systems:\n";
    if(ScaleDice == 5)
    {
        FTL += "No FTL\n";
    }
    else
    {
        do
        {
            string flavor = Pick_flavor(Ancients);
            switch(FTLDice)
            {
                case 1: FTL += flavor + " Jump Drive System\n";
                        break;
                case 2: FTL += flavor + " Network of Wormholes\n";
                        break;
                case 3: FTL += flavor + " Hyperspace System\n";
                        break;
                case 4: FTL += flavor + " Hyperspace Tower System\n";
                        break;
                case 5: FTL += flavor + " Lensing System\n";
                        break;
                case 6: if(FTLDice == 1)
                        {
                           FTL += "No FTL.\n";
                        }
                        else
                        {
                           //A no FTL roll w\ multiple FTL strips you of one of your FTLs
                           FTL += "You lost an FTL system!\n";
                        }
                        break;
                default: if(FTLDice == 1)
                         {
                            FTL += "No FTL.\n";
                         }
                         else
                         {
                            //A no FTL roll w\ multiple FTL strips you of one of your FTLs
                            FTL += "You lost an FTL system!\n";
                         }
                        break;
            }
            FTLDice = rand()%6 + 1;
            i++;
        }while(i <= ReRollDice);
    }

    switch(ScenarioDice)
    {
        case 1: Scenario = "Cold War exists between the dominant";
                if(AlienDice == 0 || HumanityDice == 1)
                {
                    Scenario += " human";
                }
                Scenario += " powers.\n";
                if(infested == true)
                {
                    Scenario += "Even as the need for cooperation grows with the out of control swarms permeating the " + scaleflav + ".\n";;
                }
                if(eldritch == true)
                {
                    Scenario += "With the very laws of physics up for grabs in this entropic free fall they have found themselves in.\n";;
                }
                if(AlienDice > 0)
                {
                    if(HumanityDice == 1)
                    {
                        Scenario += "With alien societies to use as pawns.\n";
                    }
                    else if(HumanityDice == 2)
                    {
                        Scenario += "With humans as one of the major participants.\n";
                    }
                    else if(HumanityDice > 2 && HumanityDice < 5)
                    {
                        Scenario += "With human as but a pawn for them.\n";
                    }
                    else
                    {
                        Scenario += "But, we are indifferent to it.\n";
                    }
                }
                if(primitives == true)
                {
                    if(rand()%4 == 0)
                    {
                        Scenario += "It has been agreed that primitive societies are to be left alone.\n";
                    }
                    else
                    {
                        Scenario += "Primitive societies have also become pawns in the greater " + scaleflav2 + " game.\n";
                    }
                }
                if(Ancients == true)
                {
                    Scenario += "And there is much ancient technology lying around to use to gain an advantage.\n";
                }
                if(HuAncients == true)
                {
                    Scenario += "And there is much ancient technology from long ago lying around to use for any advantage.\n";
                }
                break;
        case 2: Scenario = "Watch out! " + invaderRole + " are invading the " + scaleflav + ".\n";
                if(infested == true)
                {
                    if(rand()%4 == 0)
                    {
                        Scenario += "They are the ones who are spreading the swarms!\n";
                    }
                    else if(rand()%3 == 0)
                    {
                        Scenario += "They are here because of the swarms!\n";
                    }
                    else
                    {
                        Scenario += "They aren't helping at all with the infestation.\n";
                    }
                }
                if(eldritch == true)
                {
                    if(rand()%4 == 0)
                    {
                        Scenario += "They are from some hyperspatial realm!\n";
                    }
                    else if(rand()%3 == 0)
                    {
                        Scenario += "They are trying to change the very nature of reality itself!\n";
                    }
                    else
                    {
                        Scenario += "They are deeply incomprehensible to us, their motives are unknown.\n";
                    }
                }
                if(Gardens == true)
                {
                    if(rand()%4 == 0)
                    {
                        Scenario += "They want their garden worlds back.\n";
                    }
                    else if(rand()%3 == 0)
                    {
                        Scenario += "They are here to begin their harvest.\n";
                    }
                    else
                    {
                        Scenario += "They want these garden worlds for themselves.\n";
                    }
                }
                if(AlienDice > 0 && eldritch == false)
                {
                    if(HumanityDice == 1 && scaleflav == "Aliens")
                    {
                        if(rand()%3 == 0 && Gardens == false)
                        {
                            Scenario += "And are here for ideological reasons, not control.\n";
                        }
                        else
                        {
                            Scenario += "And threaten human dominion of the " + scaleflav + ".\n";
                        }
                    }
                    if(HumanityDice == 1 && scaleflav == "Humans")
                    {
                        if(rand()%3 == 0 && Gardens == false)
                        {
                            Scenario += "And are here for ideological reasons, not control.\n";
                        }
                        else
                        {
                        Scenario += "And are seeking total dominion of the " + scaleflav + ".\n";
                        }
                    }
                    else if(HumanityDice > 1 && HumanityDice < 5)
                    {
                        if(rand()%3 == 0 && Gardens == false)
                        {
                            Scenario += "And are here for ideological reasons, not control.\n";
                        }
                        else
                        {
                            Scenario += "And are seeking greater control of the " + scaleflav + ".\n";
                        }
                    }
                    else
                    {
                        Scenario += "And are here for ideological reasons, not control.\n";
                    }
                }
                if(Ancients == true)
                {
                    Scenario += "Also, there is ancient technology to reverse engineer in hopes of repelling them!\n";
                }
                if(HuAncients == true)
                {
                    Scenario += "Also, there is ancient human tech lying around to reverse engineer in hopes of repelling them!\n";
                }
                break;
        case 3: Scenario = "It is a " + scaleflav2 + " dark age.\n";
                if(infested == true)
                {
                    if(rand()%4 == 0)
                    {
                        Scenario += "Cancerous entities are spreading without anyone to contain them.\n";
                    }
                    else
                    {
                        Scenario += "Swarms of self replicating spacecraft are spreading without anyone to contain them.\n";
                    }
                }
                if(primitives == true)
                {
                    if(rand()%4 == 0)
                    {
                        Scenario += "Primitive societies are being conquered without any higher forces to protect them.\n";
                    }
                    else
                    {
                        Scenario += "Primitive societies are getting a chance to advance on their own terms in the vacuum that has appeared.\n";
                    }
                }
                if(eldritch == true)
                {
                    if(rand()%4 == 0)
                    {
                        Scenario += "And the entropy of the universe has accelerated to oblivion, coherrency is dead.\n";
                    }
                    else if(rand()%3 == 0)
                    {
                        Scenario += "Reality is shattered among many dimensions\n";
                    }
                    else
                    {
                        Scenario += "Life itself is melting away by the year.\n";
                    }
                }
                if(Gardens == true)
                {
                    if(rand()%4 == 0)
                    {
                        Scenario += "Yet the garden worlds persist even as civilizations fall.\n";
                    }
                    else if(rand()%3 == 0)
                    {
                        Scenario += "Resources have been stripped, there is not much left.\n";
                    }
                    else
                    {
                        Scenario += "The remnant populations take refuge among the natural sorroundings now.\n";
                    }
                }
                if(Ancients == true)
                {
                    Scenario += "The ruins of earlier fallen civilizations are looted for any advantage by whatever local powers that be.\n";
                }
                if(HuAncients == true)
                {
                    Scenario += "The ruins of earlier fallen civilizations are looted for any advantage by whatever local powers that be.\n";
                }
                break;
       default: Scenario = "The " + scaleflav + " is currently in a age of peace.\n";
                if(infested == true)
                {
                    if(rand()%4 == 0)
                    {
                        Scenario += "But, there is a cancer quietly seeping through the " + scaleflav + ".\n";
                        if(rand()%3 == 0)
                        {
                            Scenario += "And it is our fault!\n";
                        }
                    }
                    else
                    {
                        Scenario += "But, there are self replicating spacecraft quietly seeping through the " + scaleflav + ".\n";
                        if(rand()%3 == 0)
                        {
                            Scenario += "And it is our fault!\n";
                        }
                    }
                }
                if(primitives == true)
                {
                    if(rand()%4 == 0)
                    {
                        Scenario += "Primitive societies are somewhat integrated into the greater community - be it by trade or force.\n";
                    }
                    else
                    {
                        Scenario += "Primitive societies are left mostly alone unless conquered or colonized.\n";
                    }
                }
                if(eldritch == true)
                {
                    if(rand()%4 == 0)
                    {
                        Scenario += "The anomalies in the universe have gotten worse with time and it is unknown how bad it will truly get.\n";
                    }
                    else if(rand()%3 == 0)
                    {
                        Scenario += "There are frequent experiments into the unknown.\n";
                        if(rand()%3 == 0)
                        {
                            Scenario += "They are going too well...\n";
                        }
                    }
                    else
                    {
                        Scenario += "Strange anomalies have been found at the fringes...\n";
                    }
                }
                if(Gardens == true)
                {
                    if(rand()%4 == 0)
                    {
                        Scenario += "Garden worlds usually are protected.\n";
                    }
                    else
                    {
                        Scenario += "Garden worlds are being colonized regularly.\n";
                    }
                }
                if(Ancients == true)
                {
                    if(rand()%4 == 0)
                    {
                        Scenario += "The ruins of earlier civilizations are suppossed to be off limits.\n";
                    }
                    else
                    {
                        Scenario += "The ruins of earlier civilizations are under constant investigation.\n";
                    }
                }
                if(HuAncients == true)
                {
                    if(rand()%4 == 0)
                    {
                        Scenario += "The ruins of earlier human civilizations are suppossed to be off limits.\n";
                    }
                    else
                    {
                        Scenario += "The ruins of earlier civilizations are under constant investigation.\n";
                }
                break;
                }
    }

    dat<<"It is the year "<<TimeDice<<" Post-Emergance.\n"<<"\nScale of the Universe:\n"<<scale<<"\nAliens:\n"<<alien<<"\nNature of the galaxy:\n"<<galaxy<<FTL<<"\nState of humans:\n"<<Human<<"\nThe Scenario:\n"<<Scenario<<"\nAlien Roster:"<<endl;
    unsigned it = 0;
    int j = 0;
    dat<<"Humans"<<endl;
    if(AlienDice == 0)
    {
        dat<<"No other intelligent, space faring species exist."<<endl;
        if(primitives == true)
        {
            dat<<"But there are intelligent primitives out there..."<<endl;
        }
    }
    while(j != AlienDice)
    {
        int coin = rand()%3;
        if((it + 1) == Aroster.size())
        {
            it = 0;
        }
        string tmp = Aroster.at(it);
        if(j < AlienDice && coin == 0)
        {
            dat<<tmp<<endl;
            j++;
        }
        it++;
    }
    if(primitives == true && ScaleDice < 5)
    {
        dat<<"And";
        if(ScaleDice < 2)
        {
            dat<<" many, many";
        }
        if(ScaleDice > 3)
        {
            dat<<" few";
        }
        dat<<" other intelligent primitives out there..."<<endl;
    }
    dat<<"---------------------------------------------------"<<endl;
}

string Pick_flavor(bool Ancien)
{
    string flavor;
    int test = rand()%10;
    if(Ancien == true)
    {
        if(test <  3)
        {
            flavor = "An Ancient";
        }
        else if(test >= 4 && test < 8)
        {
            flavor = "A Natural";
        }
        else
        {
            flavor = "We Made a";
        }
    }
    else
    {
        if(test < 6)
        {
            flavor = "A Natural";
        }
        else
        {
            flavor = "We Made a";
        }
    }
    return flavor;
}

void Make_Lists(fstream &dat, vector<string> &alien)
{
    string name;
    while(dat>>name)
    {
        alien.push_back(name);
    }
}
