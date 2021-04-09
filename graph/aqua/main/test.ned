simple TxcRocketfuel
{
gates:
inout gate[];
}

network backbone_latencies_1221
{
submodules:
Townsville: TxcRocketfuel;
Brisbane: TxcRocketfuel;
...

connections:
Townsville.gate++ <--> { delay = 700ms; } <--> Brisbane.gate++;
Townsville.gate++ <--> { delay = 700ms; } <--> Brisbane.gate++;
...

}

