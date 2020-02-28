ids = {
    hour: 'hour',
    hourtime: 'hourtime',
    month: 'month',
    year: 'year'
}
function get ( id )
{
    return document.getElementById( id ).value;
}
function set ( id, value )
{
    document.getElementById( id ).value = value;
}

function hour2month ()
{
    let reward = get( ids.hour ) * get( ids.hourtime );
    set( ids.month, reward );
}
function month2hour ()
{
    let reward = get( ids.month ) / get( ids.hourtime );
    set( ids.hour, reward );
}
function month2year ()
{
    let reward = get( ids.month ) * 12;
    set( ids.year, reward );
}
function year2month ()
{
    let reward = get( ids.year ) / 12;
    set( ids.month, reward );
}

function button ( e )
{
    const value = get( e.id );
    switch ( e.id )
    {
        case 'hour':
            hour2month();
            month2year();
            break;
        case 'month':
            month2hour();
            month2year();
            break;
        case 'year':
            year2month();
            month2hour();
            break;
    }
}
